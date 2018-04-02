import { Trie } from '../src/trie';

describe('Trie test', () => {

    it('Can instansiate a new Trie', () => {
        expect(new Trie()).toBeInstanceOf(Trie);
    });

    it('Can query the trie', () => {
        const trie: Trie = new Trie();
        trie.insert([
            'nodejs',
            'angular',
            'javascript',
            'java',
            'coffee',
        ]);
        expect(trie.query('java')).toEqual(expect.arrayContaining(['javascript', 'java']));
        expect(trie.query('javas')).not.toEqual(expect.arrayContaining(['java']));
        expect(trie.query('java', 1)).toHaveLength(1);
        expect(trie.query('coffee')).toEqual(['coffee']);
        expect(trie.query('typescript')).toEqual([]);
    });

    it('Can insert a value into the trie', () => {
        const trie: Trie = new Trie();
        trie.insert('java');
        expect(trie.query('java')).toEqual(['java']);
    });

    it('Can insert an array into the trie', () => {
        const trie: Trie = new Trie();
        trie.insert(['java', 'javascript']);
        expect(trie.query('java')).toEqual(expect.arrayContaining(['java', 'javascript']));
    });
});
