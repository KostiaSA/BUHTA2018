export interface ITableDataSourceNode {
    children?: ITableDataSourceNode[];
}

export class TableDataSourceHelper<TNode extends ITableDataSourceNode> {
    //ds:any[];  // datasource
    constructor(public ds: TNode[]) {

    }

    private iterateNodeRecursive(node: TNode, parent: TNode | undefined, iterator: (node: TNode, parent?: TNode) => void) {
        iterator(node, parent);
        if (node.children) {
            node.children.forEach((rootNode: TNode) => {
                this.iterateNodeRecursive(rootNode, node, iterator);
            });

        }
    }

    iterateAllNodes(iterator: (node: TNode, parent?: TNode) => void) {
        this.ds.forEach((rootNode: TNode) => {
            this.iterateNodeRecursive(rootNode, undefined, iterator);
        });

    }

    getFolderNodes(): ITableDataSourceNode[] {
        let nodes: ITableDataSourceNode[] = [];
        this.iterateAllNodes((node) => {
            if (node.children)
                nodes.push(node);
        });
        return nodes;
    }
}