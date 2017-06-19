def lcs(x , y):
    x = ' ' + x; y = ' ' + y
    dp = [[0 for _ in y] for _ in x]
    print(hex(id(dp)))
    for i in dp: print(hex(id(i)))
    bk = dp.copy()
    print()
    #bk = [[0 for _ in y] for _ in x]
    print(hex(id(bk)))
    for i in bk: print(hex(id(i)))
    for i in range(1 , len(x)):
        for j in range(1 , len(y)):
            if x[i] == y[j]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                k = max(dp[i][j - 1] , dp[i - 1][j])
                if dp[i - 1][j] < dp[i][j - 1]:
                    dp[i][j] = dp[i][j - 1]
                    bk[i][j] = 1 # left
                else:
                    dp[i][j] = dp[i - 1][j]
                    bk[i][j] = 2 # up
                if k != dp[i][j]:
                    print(k , dp[i][j] , dp[i - 1][j] , dp[i][j - 1])
                    exit(0)
    for i in dp:print(i)
#    bkt(x , y , bk , len(x) - 1 , len(y) - 1)

def bkt(x , y , bk , i , j):
    if i == 0 or j == 0: print()
    elif bk[i][j] == 0:
        bkt(x , y , bk , i - 1 , j - 1)
        print(x[i] , end = '')
    elif bk[i][j] == 1:
        bkt(x , y , bk , i , j - 1)
    else:
        bkt(x , y , bk , i - 1 , j)

#lcs("a" , "b")
lcs("abc" , "abcdef")
