class CodemirrorClientFactory {
    static instance(cm) {
        return new CodeMirrorClient(cm);
    }
}
