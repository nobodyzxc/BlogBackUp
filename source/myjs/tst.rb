module Rectangle
    Edge = 4   # 廢話
    def area wid , len      # 注意 area , class fn => instance fn
        len * wid
    end

    def shape
        "Rectangle"
    end
end

module Square  # 我知道它當 class 不太好...
    extend Rectangle
end

puts Square.area 5 , 5 # 就是這樣
