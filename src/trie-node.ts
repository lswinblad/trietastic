export class TrieNode {

    /**
     * Whether or not this node, including all the parents, represents a complete word.
     * @type {boolean}
     */
    public isWord: boolean = false;

    /**
     * The children of this node.
     * @type {Map<string, TrieNode>}
     */
    protected children: Map<string, TrieNode> = new Map<string, TrieNode>();

    /**
     * Sets the child for the provided character.
     *
     * @param char
     * @param node
     */
    public setChild(char: string, node: TrieNode): void {
        this.children.set(char, node);
    }

    /**
     * The child corresponding to the provided character.
     *
     * @param char
     * @returns {undefined|TrieNode}
     */
    public getChild(char: string): TrieNode | undefined {
        return this.children.get(char);
    }

    /**
     * Whether this node has a child for the provided character.
     *
     * @param char
     * @returns {boolean}
     */
    public hasChild(char: string): boolean {
        return this.children.has(char);
    }

    /**
     * The children of this node.
     *
     * @returns {IterableIterator<[string,TrieNode]>}
     */
    public getChildren(): IterableIterator<[string, TrieNode]> {
        return this.children.entries();
    }

    /**
     * Whether this is the last node in the branch.
     *
     * @returns {boolean}
     */
    public isLast(): boolean {
        return this.children.size === 0;
    }
}
