#!/usr/bin/python
'''
I wrote this script to obtain words from the
OS dictionary and format it properly
'''
def main():
    from string import ascii_lowercase
    letters = ascii_lowercase
    xmap = {}
    char = ''
    # could be /usr/dict/words in other linux flavor
    path = '/usr/share/dict/words'
    with open(path) as f:
        lines = [ line.strip().lower() for line in f.readlines() ]
        char = ''
        xlist = []
        for line in lines:
            if (len(char) == 0 and line[0] != char):
                char = line[0]
            if len(line) >= 3 and len(line) <= 12:
                if (line.startswith(char)):
                    xlist.append(line)
                else:
                    xmap[char] = xlist
                    char = line[0]
                    xlist = []
    nmap = {}
    with open('output.txt', 'a') as f:
        for j in xrange(3, 13):
            wlist = []
            for char, words in xmap.items():
                for word in words:
                    if len(word) == j:
                        wlist.append(word)
            nmap[j] = wlist

    with open('output.txt', 'a') as f:
        f.write('{\n')
        for key, array in nmap.items():
            f.write('\t{}: {},\n'.format(key, array))
        f.write('}')

if __name__ == '__main__':
    main()
