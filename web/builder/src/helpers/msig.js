import { Serialize } from 'eosjs';

class MsigHelper {
    constructor(sb) {
        this.sb = sb;
    }

    async getTrx(actions) {
        let transaction = {actions: actions};

        let info = await this.sb.rpc.get_info();
        let refBlock = await this.sb.rpc.get_block(info.head_block_num - 3);
        transaction = { ...Serialize.transactionHeader(refBlock, 63072000), ...transaction };
        transaction = { ...transaction, actions: await this.sb.api.serializeActions(transaction.actions) };
        transaction.ref_block_num = 0;
        transaction.ref_block_prefix = 0;
        return {
            max_net_usage_words: 0,
            max_cpu_usage_ms: 0,
            delay_sec: 0,
            context_free_actions: [],
            actions: [],
            transaction_extensions: [],
            ...transaction
        };
    }

    async propose(trx, proposalName, requestedPermissions) {
        let action = this.sb.makeAction("eosio.msig", "propose",
            {
                proposer: this.sb.currentAccount.name,
                proposal_name: proposalName,
                requested: await this.getRequested(requestedPermissions),
                trx: trx
            });
        await this.sb.sendTx([action]);
    }

    async getRequested(permission) {
        let account = await this.sb.rpc.get_account(permission.actor);
        for(let i = 0; i < account.permissions.length; i++) {
            let current = account.permissions[i];
            if(current.perm_name === permission.permission) {
                return current.required_auth.accounts.map((permLevel) => {
                    return permLevel.permission;
                });
            }
        }
    }

    async approve(proposer, proposalName) {
        let action = this.sb.makeAction("eosio.msig", "approve",
            {
                proposer: proposer,
                proposal_name: proposalName,
                level: { actor: this.sb.currentAccount.name, permission: "active"}
            });
        await this.sb.sendTx([action]);
    }

    async cancel(proposer, proposalName) {
        let action = this.sb.makeAction("eosio.msig", "cancel",
            {
                proposer: proposer,
                proposal_name: proposalName,
                canceler: this.sb.currentAccount.name
            });
        await this.sb.sendTx([action]);
    }

    async exec(proposer, proposalName) {
        let action = this.sb.makeAction("eosio.msig", "exec",
            {
                proposer: proposer,
                proposal_name: proposalName,
                executer: this.sb.currentAccount.name
            });
        await this.sb.sendTx([action]);
    }
}


export default MsigHelper;