clear
echo 仅整活使用
nu=0
while (( $nu < 1 ));do
    sleep 1
    echo -n "加载中"
    sleep 1
    echo -n "."
    sleep 1
    echo -n "."
    sleep 1
    echo -n "."
    sleep 1
    clear
    let nu+=1  
done
clear
echo 请输入问题:
read "Input your choice:" choice_user
clear
num=0
while (( $num < 2 ));do
    sleep 1
    echo -n "."
    sleep 1
    echo -n "."
    sleep 1
    echo -n "."
    sleep 1
    clear
    let num+=1   
done 
echo -E -n "<think>"
echo -E -n "因为我是0B的模型，"
sleep 1
echo -E -n "我什么也"
sleep 1
echo -E -n "不知道，"
sleep 1
echo -E -n "所以"
sleep 1
echo -E -n "我应该"
sleep 1
echo -E -n "装作 "
sleep 1
echo -E -n "服务器繁忙，请稍后重试"
sleep 1
echo -E "<think>"
sleep 1      
echo 服务器繁忙，请稍后重试
sleep 1       