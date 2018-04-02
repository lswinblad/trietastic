import { TrieNode } from './trie-node';

interface ICandidate {
    prefix: string;
    children: IterableIterator<[string, TrieNode]>;
}

const DEFAULT_OPTIONS: ITrieOptions = {
    includeQuery: true,
};

export interface ITrieOptions {
    splitOn?: RegExp | string;
    maxSuggestions?: number;
    includeQuery?: boolean;
}

export class Trie {
    /**
     * @type {TrieNode}
     */
    protected root: TrieNode = new TrieNode();

    protected options: ITrieOptions;

    constructor(options?: ITrieOptions) {
        this.options = {
            ...DEFAULT_OPTIONS,
            ...options,
        };
    }

    /**
     * Inserts the given value into the tree.
     *
     * @param values {string|string[]}
     */
    public insert(values: string | string[]): void {
        if (!Array.isArray(values)) {
            values = [values as string];
        }

        for (const value of values) {
            let root: TrieNode = this.root;

            for (const char of value) {
                if (root.hasChild(char)) {
                    root = root.getChild(char) as TrieNode;
                } else {
                    root.setChild(char, root = new TrieNode());
                }
            }

            root.isWord = true;
        }
    }

    /**
     * Search the trie tree for the given query.
     *
     * @param query: {string}
     * @param maxSuggestions: {string}
     * @returns suggestions {string[]} an array containing the suggestion words for the query.
     */
    public query(query: string, maxSuggestions?: number | undefined): string[] {
        let root: TrieNode = this.root;

        // Fast-forward
        for (const char of query) {
            if (root.hasChild(char)) {
                root = root.getChild(char) as TrieNode;
            } else {
                return [];
            }
        }

        const suggestions: string[] = [];

        if (this.options.includeQuery && root.isWord) {
            suggestions.push(query);
        }

        const candidates: ICandidate[] = [{
            prefix: query,
            children: root.getChildren(),
        }];

        while (candidates.length > 0) {
            const candidate = candidates.pop() as ICandidate;

            for (const [char, node] of candidate.children) {
                const prefix: string = candidate.prefix + char;

                if (node.isWord) {
                    suggestions.push(prefix);
                }

                if (typeof maxSuggestions !== 'undefined' && suggestions.length === maxSuggestions) {
                    return suggestions;
                }

                if (! node.isLast()) {
                    candidates.push({
                        prefix,
                        children: node.getChildren(),
                    });
                }
            }
        }

        return suggestions;
    }
}
