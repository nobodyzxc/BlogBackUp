def get_file_first_line
    err_try = 0
    print "> "
    fname = gets.chomp
    begin
        file = open(fname)
        rtn = file.gets
    rescue
        if err_try < 3
            print "> "
            fname = gets.chomp
            err_try += 1
            retry               # jump to begin
        end
    ensure                      # do ensure block no matter what
        puts "Ensure close file"
        file&.close             # &. -> safer func call
    end
    rtn
end

puts ">> #{get_file_first_line}"
