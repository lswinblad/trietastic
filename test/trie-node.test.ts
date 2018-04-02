import { TrieNode } from '../src/trie-node';

describe('TrieNode test', () => {
    it('Can instansiate a new TrieNode', () => {
        expect(new TrieNode()).toBeInstanceOf(TrieNode);
    });

    it('Can set a child', () => {
        const parent: TrieNode = new TrieNode();
        const child: TrieNode = new TrieNode();
        parent.setChild('a', child);
        expect(parent.hasChild('a')).toBe(true);
        expect(parent.getChild('a')).toEqual(child);
    });
});
