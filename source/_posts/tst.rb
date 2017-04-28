def LbdaTst
                                    # lambda 直接再進一個 stack
    yield                     # 所以該行回傳結果是 "inner Lbda"
    return "LbdaTst"                # 然後 return "LbdaTst"
end

puts LbdaTst &Proc.new{ return "inner Lbda" }
