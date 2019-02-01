import AbiBuilder from "./AbiBuilder";
import CodeBuilder from "./CodeBuilder";
import TransferBuilder from "./TransferBuilder";
import CustomBuilder from "./CustomBuilder";

export default {
    transfer: {
        displayName: "Transfer",
        module: TransferBuilder
    },
    code: {
        displayName: "Set Abi",
        module: CodeBuilder
    },
    abi: {
        displayName: "Set Code",
        module: AbiBuilder
    },
    custom: {
        displayName: "Custom Action",
        module: CustomBuilder
    }
};
