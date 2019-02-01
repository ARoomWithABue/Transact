import Error from "./Error";
import BuilderSelector from "./BuilderSelector";
import builders from "./builders";

export default {
    error: Error,
    actionSelector: BuilderSelector,
    ...builders
};