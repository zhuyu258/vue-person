<template>
    <div>
        <h1>数据结构</h1>
        <h4>什么是数据结构？</h4>
        <p>数据结构就是存储数据的结构</p>
        <h4>类别：</h4>
        <pre>
            1.线性数据结构
                一对一的关系，数组、队列和栈
            2.树形数据结构
                一对多的关系
            3.图
                多对多的关系
        </pre>
        <h2>练习题</h2>
        <h3>1. 字符串中的每个单词进行反转</h3>
        <p>{{ word }}</p>
        <button @click="revertByWord">反转</button>
        <p>{{ revertWord }}</p>
        <h3>2. 如下电话号码，点击任意键进行字母组合</h3>
        <div class="key" @click="keyBtn($event)">
            <span v-for="(item,index) in keyArr" :key="index"><i>{{index+1}}</i>{{item}}</span>
        </div>
        <p>组合的结果：</p>
        <div class="key">
            <span v-for="(item,index) in keyVal" :key="index">{{item}}</span>
        </div>
        <h3>3. 卡牌分组</h3>
        <pre>
            给定一副牌，每张牌上都写着一个整数
            此时，你需要选定一个数字X,使我们可以将整副牌按下述规则分成1组或者更多组：
                每组都有X张牌
                组内所有的牌上都写着相同的整数
            仅当你可选的X>=2时返回true

            eg1:
                输入： [1,2,3,4,4,3,2,1]
                输出： true
                解释： 可行的分组是 [1,1] [2,2] [3,3] [4,4]

            eg2:
                输入： [1,1,1,2,2,2,3,3]
                输出： false
                解释： 可行的分组是 [1,1,1] [2,2,2] [3,3]

            eg3:
                输入:  [1,1,1,1,2,2]
                输出:  true
                解释： 可行的分组是 [1,1] [1,1] [2,2]
        </pre>
        <p>输入：</p>
        <input type="text" v-model="cardInput">
        <button @click="cardInputBtn">提交</button>
        <p>输出值：{{cardVal}} <span v-for="(item,index) in cardObj" :key="index">[<i v-for="(items,indexs) in item" :key="indexs">{{index}}</i>]</span> </p>
        <h3>4. 种花问题</h3>
        <pre>
            假设你有一个很长的花坛，一部分地块种植了花，另一部分却没有。可是，花卉不能种植在相邻的地块上，它们会争夺水源，两者都会死去。

            给定一个花坛（表示为一个数组包含0和1，其中0表示没种植花，1表示种植了花），和一个数 n 。能否在不打破种植规则的情况下种入 n 朵花？能则返回True，不能则返回False。

            示例 1:

            输入: flowerbed = [1,0,0,0,1], n = 1
            输出: True
            示例 2:

            输入: flowerbed = [1,0,0,0,1], n = 2
            输出: False
            注意:

            数组内已种好的花不会违反种植规则。
            输入的数组长度范围为 [1, 20000]。
            n 是非负整数，且不会超过输入数组的大小。
        </pre>
        <p>请输入花坛：</p>
        <input type="text" v-model="flowersInput">
        <p>请输入种植的数量：</p>
        <input type="number" v-model="flowersN">
        <button @click="flowersBtn">提交</button>
        <p>
            [
            <span v-for="(item,index) in flowersInput" :key="index">
                {{item}},
            </span>
            ]
        </p>
        <p>种植结果：{{flowersResult}}</p>
        <p>当前只能种植：{{flowersOnlyN}}株</p>
        <h3>5. 格雷编码</h3>
        <pre>
            格雷编码是一个二进制数字系统，在该系统中，两个连续的数值仅有一个位数的差异。
            给定一个代表编码总位数的非负整数 n，打印其格雷编码序列。即使有多个不同答案，你也只需要返回其中一种。
            格雷编码序列必须以 0 开头。
            示例 1:
                输入: 2
                输出: [0,1,3,2]
                解释:
                00 - 0
                01 - 1
                11 - 3
                10 - 2

                对于给定的 n，其格雷编码序列并不唯一。
                例如，[0,2,3,1] 也是一个有效的格雷编码序列。

                00 - 0
                10 - 2
                11 - 3
                01 - 1

            示例 2:
                输入: 0
                输出: [0]
                解释: 我们定义格雷编码序列必须以 0 开头。
                     给定编码总位数为 n 的格雷编码序列，其长度为 2n。当 n = 0 时，长度为 20 = 1。
                     因此，当 n = 0 时，其格雷编码序列为 [0]。
        </pre>
        <p>请输入整数：</p>
        <input type="number" v-model="grayCodeN">
        <button @click="grayCodeBtn">提交</button>
        <p>二进制系统</p>
        <p v-show="grayCodeBinaryResultArr">
            [
            <br/>
            <span v-for="(item,index) in grayCodeBinaryResultArr" :key="index">{{item}} <br/></span>
            ]
        </p>
        <p>输出结果</p>
        <p v-show="grayCodeResultArr">
            [
            <span v-for="(item,index) in grayCodeResultArr" :key="index">{{item}}{{ index === grayCodeResultArr.length-1 ? '' : ','}}</span>
            ]
        </p>
        <div class="answer-box">
            <el-collapse v-model="grayCodeFlag" >
                <el-collapse-item title="答案" name="1">
                    <pre class="code">
                        function grayCodeBtn(grayCodeN){
                            let grayCodeBinaryResultArr = grayCodeFn(grayCodeN)
                            return grayCodeBinaryResultArr.map(item=>{
                                return parseInt(item,2)
                            })
                        }

                        // 格蕾数函数封装
                        function grayCodeFn(n){
                            if(n===0){  
                                return [0]
                            }
                            if(n===1){
                                return [0,1]
                            }
                            let result = this.grayCodeFn(n-1)
                            let len = Math.pow(2,n)
                            let arr1 = []
                            let arr2 = []
                            for(let i = 0; i 小于 len/2;i++){
                                arr1.push(`0${result[i]}`)
                                arr2.push(`1${result[i]}`)
                            }
                            return [...arr1,...arr2.reverse()]
                        }
                        grayCodeBtn(2)
                    </pre>
                </el-collapse-item>
            </el-collapse>
        </div>
        <h3>6. 重复的子字符串</h3>
        <pre class="code">
            给定一个非空的字符串，判断它是否可以由它的一个子串重复多次构成。给定的字符串只含有小写英文字母，并且长度不超过10000。

            示例 1:
                输入: "abab"

                输出: True

                解释: 可由子字符串 "ab" 重复两次构成。

            示例 2:
                输入: "aba"

                输出: False

            示例 3:
                输入: "abcabcabcabc"

                输出: True

                解释: 可由子字符串 "abc" 重复四次构成。 (或者子字符串 "abcabc" 重复两次构成。)
        </pre>
        <p>请输入：</p>
        <input type="text" v-model="repeatSubstrInput">
        <button @click="repeatSubstrBtn">提交</button>
        <p>结果：</p>
        <p>{{repeatSubstrResult}}</p>
        <div class="answer-box">
            <el-collapse  >
                <el-collapse-item title="答案" name="1">
                    <pre class="code">
                        <!-- 方法一
                            1. 让字符串s重复一次
                            2. 去掉首位字符，获取子字符串b
                            3. 查看b中是否包含s
                            4. 如果包含表示是重复的，否则不是
                         -->
                        var repeatedSubstringPattern = function (s) {
                            const doubleS = s + s;
                            const sliceS = doubleS.slice(1, doubleS.length - 1);
                            return sliceS.indexOf(s) > -1 ? true : false;
                        };
                        <!-- 
                            方式二

                        -->

                        function repeatStr(s){
                            const reg =  /^(\w+)\1+$/g
                            return reg.test(s)
                        }
                        
                    </pre>
                </el-collapse-item>
            </el-collapse>
        </div>
        <h3>7. 正则表达式匹配</h3>
        <pre class="code">
            给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。

            '.' 匹配任意单个字符
            '*' 匹配零个或多个前面的那一个元素
            所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。

            示例 1：

            输入：s = "aa" p = "a"
            输出：false
            解释："a" 无法匹配 "aa" 整个字符串。

            示例 2:

            输入：s = "aa" p = "a*"
            输出：true
            解释：因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。

            示例 3：

            输入：s = "ab" p = ".*"
            输出：true
            解释：".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。

            示例 4

            输入：s = "aab" p = "c*a*b"
            输出：true
            解释：因为 '*' 表示零个或多个，这里 'c' 为 0 个, 'a' 被重复一次。因此可以匹配字符串 "aab"。

            示例 5：

            输入：s = "mississippi" p = "mis*is*p*."
            输出：false

            提示：
            0 小于= s.length 小于= 20
            0 小于= p.length 小于= 30
            s 可能为空，且只包含从 a-z 的小写字母。
            p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。
            保证每次出现字符 * 时，前面都匹配到有效的字符
        </pre>
        <p>请输入：</p>
        <input type="text" placeholder="请输入s" v-model="regSSubstrInput">
        <input type="text" placeholder="请输入p" v-model="regPSubstrInput">
        <button @click="regSubstrBtn">提交</button>
        <p>结果： {{regSubResult}}</p>
        
        <h3>8. 冒泡排序</h3>
        <pre class="code">
            升序:
                每一轮遍历都是前后两个进行比较，前者比后者大就交换位置,遍历完这一轮之后,最大值被排到了这一轮的最后
                利用这个特点可以优化很多排序算法,降序则相反

            简单的说就是每一轮遍历就是把这一轮中的最大值排到最右边,遍历的轮数就是数组的长度-1,最后一轮无需再遍历,
            每一轮都是从0遍历到当前轮的值

            eg:
                有一个数组的长度为10,那么遍历的轮数就是9轮,第一轮要遍历9次,从0到9找出这一轮的最大值排列到最右边,第二轮
                就是遍历8次从0-8找出这一轮的最大值,然后第三轮七次,依次递减
        </pre>
        <p>请输入：</p>
        <input type="text" placeholder="请输入" v-model="bubblingInput">
        <p v-show="bubblingResult.length">
            [
            <span v-for="(item,index) in bubblingResult" :key="index">{{item}}{{ index === bubblingResult.length-1 ? '' : ','}}</span>
            ]
        </p>
        <button @click="bubblingBtn">提交</button>
        <el-collapse  >
            <el-collapse-item title="答案" name="2">
                <pre class="code">
                    function bubblingBtn (arr) {
                        if (!arr.length) {
                            return
                        }
                        for(let i = arr.length - 1, temp; i > 0; i --){ // 遍历轮数
                            for(let j = 0; j 《 i; j ++ ){ // 每轮遍历次数 排出这一轮的最大值
                                if(Number(arr[j]) > Number(arr[j+1])){
                                    temp = arr[j+1]
                                    arr[j+1] = arr[j]
                                    arr[j] = temp
                                }
                            }
                        }
                        return arr
                    }
                </pre>
            </el-collapse-item>
        </el-collapse>

        <h3>9. 选择排序</h3>
        <pre class="code">
            拿当前值和后面的进行比较，找出比当前值小的值标记为最小值，然后一次进行比较，比较完之后把最小值和当前值进行交换位置
        </pre>
        <p>请输入：</p>
        <input type="text" placeholder="请输入" v-model="selectInput">
        <p v-show="selectResult.length">
            [
            <span v-for="(item,index) in selectResult" :key="index">{{item}}{{ index === selectResult.length-1 ? '' : ','}}</span>
            ]
        </p>
        <button @click="selectBtn">提交</button>
        <el-collapse  >
            <el-collapse-item title="答案" name="3">
                <pre class="code">
                    function selectBtn(arr){
                        if(!arr.length){
                            return 
                        }
                        for(let i = 0,min, z; i 《 arr.length; i++){
                            min = Number(arr[i])
                            for(let j = i+1; j 《 arr.length; j++){
                                if(min > Number(arr[j])){
                                    min = arr[j]
                                    z = j
                                }
                            }
                            arr[z] = arr[i]
                            arr[i] = min
                        }
                        return arr
                    }
                </pre>
            </el-collapse-item>
        </el-collapse>

        <h3>10. 最大间距</h3>
        <pre class="code">
            给定一个无序的数组，找出数组在排序之后，相邻元素之间最大的差值。
            如果数组元素个数小于 2，则返回 0。

            示例 1:

                输入: [3,6,9,1]
                输出: 3
                解释: 排序后的数组是 [1,3,6,9], 其中相邻元素 (3,6) 和 (6,9) 之间都存在最大差值 3。

            示例 2:

                输入: [10]
                输出: 0
                解释: 数组元素个数小于 2，因此返回 0。
        </pre>
        <p>请输入：</p>
        <input type="text" placeholder="请输入" v-model="maxSpacingInput">
        <p v-show="maxSpacingResult">
           {{ maxSpacingResult }}
        </p>
        <button @click="maxSpacingBtn">提交</button>
        <el-collapse  >
            <el-collapse-item title="答案" name="4">
                <pre class="code">
                    function maxSpacingBtn(arr){
                        if(arr.length 《 2){
                            return 0
                        }
                        if(arr.length === 2){
                            return Math.abs(Number(arr[0])-arr[1])
                        }
                        let max = 0
                        console.log('arr',arr)
                        for(let i = arr.length - 1, empt; i > 0; i--){
                            for(let j = 0; j 《 i; j ++){
                                if(Number(arr[j]) > Number(arr[j+1])){
                                    empt = arr[j+1]
                                    arr[j+1] = arr[j]
                                    arr[j] = empt
                                }
                            }
                            if(i !== arr.length - 1 ){
                                let val = Number(arr[i+1]) -  Number(arr[i])
                                if(val >  Number(max)){
                                    max = val
                                }
                            }
                        }
                        return max
                    }
                </pre>
            </el-collapse-item>
        </el-collapse>
        <h3>11. 按奇偶排序数组</h3>
        <pre class="code">
            给定一个非负整数数组 A，返回一个数组，在该数组中， A 的所有偶数元素之后跟着所有奇数元素。

            你可以返回满足此条件的任何数组作为答案

            示例 1:

                输入：[3,1,2,4]
                输出：[2,4,3,1]
                输出 [4,2,3,1]，[2,4,1,3] 和 [4,2,1,3] 也会被接受。
        </pre>
        <p>请输入：</p>
        <input type="text" placeholder="请输入" v-model="oddEvenInput">
        <p v-show="oddEvenResult.length">
            [
            <span v-for="(item,index) in oddEvenResult" :key="index">{{item}}{{ index === oddEvenResult.length-1 ? '' : ','}}</span>
            ]
        </p>
        <button @click="oddEvenBtn">提交</button>
        <el-collapse  >
            <el-collapse-item title="答案" name="5">
                <pre class="code">
                    思路一：
                    function oddEvenBtn(arr){
                        let oddArr = []
                        let evenArr = []
                        arr.forEach(item=>{
                            if(item%2===0){ // 偶数
                                oddArr.push(item)
                            }else{  // 奇数
                                evenArr.push(item)
                            }
                        })
                        return [...oddArr,...evenArr]
                    }

                    思路二：
                    function oddEvenBtn(arr){
                        // 使用sort排序，返回正数就调换位置，偶数的余数都是0，奇数的余数都是1， 0 - 1返回负数
                        return arr.sort((a,b)=>(a%2 - b%2))

                        /**
                            1转为二进制: 0001  奇数转为二进制最后一个都是1， 偶数转为二进制最后一位是0
                            通过 & 运算符得到 偶数得到的是 0， 奇数得到的是1，再进行相减再排序
                            “&”运算符（位与）用于对两个二进制操作数逐位进行比较，并根据下表所示的换算表返回结果。
                         */
                        return A.sort((a, b) => (a & 1) - (b & 1))
                    }
                </pre>
            </el-collapse-item>
        </el-collapse>

        <h3>12. 按奇偶排序数组2</h3>
        <pre class="code">
            给定一个非负整数数组 A， A 中一半整数是奇数，一半整数是偶数。

            对数组进行排序，以便当 A[i] 为奇数时，i 也是奇数；当 A[i] 为偶数时， i 也是偶数。

            你可以返回任何满足上述条件的数组作为答案。

            示例 1:

                输入：[4,2,5,7]
                输出：[4,5,2,7]
                解释：[4,7,2,5]，[2,5,4,7]，[2,7,4,5] 也会被接受。
        </pre>
        <p>请输入：</p>
        <input type="text" placeholder="请输入" v-model="oddEvenInput2">
        <p v-show="oddEvenResult2.length">
            [
            <span v-for="(item,index) in oddEvenResult2" :key="index">{{item}}{{ index === oddEvenResult2.length-1 ? '' : ','}}</span>
            ]
        </p>
        <button @click="oddEvenBtn2">提交</button>
        <h3>13. 数组中的第k个最大元素</h3>
        <pre class="code">
            在未排序的数组中找到第k个最大元素，请注意，你需要找到的是数组排序
            后的第k个最大的元素，而不是第k个不同的元素

            示例：
                输入：[3,2,1,5,6,4] 和 k = 2
                输出: 5

            示例2:
                输入： [3,2,3,1,2,4,5,5,6] 和 k = 4
                输出：4
        </pre>
        <p>请输入：</p>
        <input type="text" placeholder="请输入" v-model="arrMaxKInput">
        <input type="text" placeholder="请输入最大K" v-model="arrMaxk">
        <button @click="arrMaxKBtn">提交</button>
        <p>结果: {{ arrMaxKVal }}</p>
        <el-collapse  >
            <el-collapse-item title="答案" name="6">
                <pre class="code">
                    function arrMaxKBtn(arr,arrMaxk){
                        // 升序:
                        // 每一轮遍历都是前后两个进行比较，前者比后者大就交换位置,遍历完这一轮之后,最大值被排到了这一轮的最后
                        // 利用这个特点可以优化很多排序算法,降序则相反
                        // 利用冒泡排序的特点 每排列一次就可以得到当前排列的最大值，所以利用这个特点不需要排序整个数组就可以得到答案
                        for(let i = arr.length - 1,tem; i > 0; i --){
                            for(let j = 0; j 《 i; j ++){
                                if(arr[j] > arr[j+1]){
                                    tem = arr[j+1]
                                    arr[j+1] = arr[j]
                                    arr[j] = tem
                                }
                            }
                            if(Number(arrMaxk) === arr.length - i){
                                return  arr[i]
                            }
                        }
                    }
                </pre>
            </el-collapse-item>
        </el-collapse>
        <h3>14. 缺失的第一个正数</h3>
        <pre class="code">
            给你一个未排序的整数数组，请你找出其中没有出现的最小的正整数。

            示例 1:
                输入: [1,2,0]
                输出: 3

            示例 2:

                输入: [3,4,-1,1]
                输出: 2
            示例 3:

                输入: [7,8,9,11,12]
                输出: 1
        </pre>
        <p>请输入：</p>
        <input type="text" placeholder="请输入" v-model="losePositiveNumInput">
        <button @click="losePositiveNumBtn">提交</button>
        <p>结果: {{ losePositiveNumVal }}</p>
        <el-collapse  >
            <el-collapse-item title="答案" name="7">
                <pre class="code">
                    function  losePositiveNumBtn(arr){
                        if(!arr.length){
                            return 1
                        }
                        let z = 1
                        let obj = {}
                        // 冒泡降序
                        for(let i = arr.length - 1,tem; i >= 0; i --){
                            for(let j = 0; j 《 i; j++){
                                if(arr[j] 《 Number(arr[j+1])){
                                    tem = arr[j+1]
                                    arr[j+1] = arr[j]
                                    arr[j] = tem
                                }
                                
                            }
                            if(obj[arr[i]]){ // 去重
                                arr.splice(i,1)        
                                arr[i] > 0 && z-- // 正数才减一
                            }
                            obj[arr[i]] = true
                            // 正数并且不等于z的时候就返回这个z
                            if(Number(arr[i]) > 0 && Number(arr[i]) !== z){
                                return z
                            }
                            // 正数才加1
                            if(Number(arr[i]) > 0){
                                z++
                            }
                        }
                        return z

                        // 方法2
                        let len = arr.length
                        for(let i = 0; i 《 len; i++){
                            while(arr[i] > 0 && arr[i] 《= len && arr[i] !== arr[arr[i]-1]){
                                let temp = arr[i]
                                arr[i] = arr[arr[i]-1]
                                arr[arr[i]-1] = temp
                            }
                        }

                        for(let i = 0; i 《 len; i++){
                            if(arr[i] !== i + 1){
                                return i + 1
                            }
                        }
                        return len + 1
                    }

                    
                </pre>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
export default {
    data(){
        return {
            word: "Let's go to schools",
            revertWord: '',
            keyArr: ['','abc','def','ghi','jkl','mno','pqrs','tuv','wxyz'],
            saveKeyArr: [],
            timer: null,
            keyVal: [],
            cardInput: '',
            cardVal: false,
            cardObj: {},
            flowersInput: '',
            flowersN: 1,
            flowersResult: false,
            flowersOnlyN: 0,
            grayCodeN: 0,
            grayCodeBinaryResultArr: [],
            grayCodeResultArr: [],
            grayCodeFlag: ['2'],
            repeatSubstrInput: '',
            repeatSubstrResult: '',
            regSSubstrInput: '',
            regPSubstrInput: '',
            regSubResult: '',
            bubblingInput: '',
            bubblingResult: [],
            selectInput: '',
            selectResult: [],
            maxSpacingInput: '',
            maxSpacingResult: '',
            oddEvenInput: '',
            oddEvenResult: [],
            oddEvenInput2: '',
            oddEvenResult2: [],
            arrMaxKInput: [],
            arrMaxKVal: '',
            arrMaxk: 1,
            losePositiveNumInput: [],
            losePositiveNumVal: ''
        }
    },
    mounted () {

    },
    methods: {
        // 单词反转
        revertByWord(){
            /*
                方式一

                split(separator,howmany)
                - separator	必需。字符串或正则表达式，从该参数指定的地方分割 stringObject。
                - howmany	可选。该参数可指定返回的数组的最大长度。如果设置了该参数，返回的
                            子串不会多于这个参数指定的数组。如果没有设置该参数，整个字符串都
                            会被分割，不考虑它的长度。
            */
            // this.revertWord = this.word.split(' ').map(item=>{
            //     return item.split('').reverse().join('')
            // }).join(' ')
            /**
             * 方式二  通过正则
             * \s 包括空格、换行、tab缩进等所有的空白
             */
            // this.revertWord = this.word.split(/\s/g).map(item=>{
            //     return item.split('').reverse().join('')
            // }).join(' ')

            /*
                方式三  正则

                "\w"：匹配字母，数字，下划线。等价于'[A-Za-z0-9_]'
                "."：匹配除了换行符以外的任何字符。
                [ ]就是匹配中括号里的任意一个字符
                [\w'] 匹配任意字母或数字或下划线或'
            */
            this.revertWord = this.word.match(/[\w']+/g).map(item=>{
                console.log('item',item)
                return item.split('').reverse().join('')
            }).join(' ')
        },
        // 键盘按钮
        keyBtn (e) {
            this.saveKeyArr.push(e.target.innerText.substr(1))
            console.log(this.timer)
            this.bounce(this.composeWord,this.saveKeyArr).then(res=>{
                this.keyVal = res
            })
        },
        // 防抖
        bounce(callBack,arg){
            return new Promise((res)=>{
                this.timer && clearTimeout(this.timer)
                this.timer = setTimeout(()=>{
                    callBack && callBack(arg)
                    console.log(arg)
                    res([...arg[0]])
                    this.timer = null
                    this.saveKeyArr = []
                },3000)
            })
        },
        // 字母组合
        /*
            思路： 点击任意几个键。把每个键上的字母存储在数组中，
            eg [abc,def,ghi],然后遍历前两项进行组合，组合完毕之后把组合之后的结果替换成前两项，得到
            [[ad,ae,af...],ghi],然后再遍历这个数组的前两项进行组合，再把前两项替换成组合后的那一项，
            最后数组只有一项了，便是最终的组合结果
        */
        composeWord (arr) {
            let temp = []
            if(arr.length <= 1){
                return arr
            }
            // 组合arr的第0个和第一个字母
            for(let i = 0; i < arr[0].length; i++){
                for(let j = 0; j < arr[1].length; j++){
                    temp.push(`${arr[0][i]}${arr[1][j]}`)
                }
            }
            arr.splice(0,2,temp) // 前面两个组合完毕，把前面两项替换成组合之后的一项继续往下组合
            // arr大于一表示可以继续组合
            if(arr.length > 1){
                this.composeWord(arr)
            }
            return arr
        },
        /*
            卡牌

        */
        cardInputBtn () {
            let arr = this.cardInput.split('')
            arr.sort((a,b)=>a-b)
            let obj = {}
            let min = Number.MAX_SAFE_INTEGER
            arr.forEach((item,index)=>{
                if(obj[item]){
                    obj[item] += 1
                    if(index === (arr.length-1) && obj[arr[index-1]] < min){
                        min = obj[arr[index-1]]
                    }
                } else {
                    obj[item] = 1
                    if(index > 1 && obj[arr[index-1]] < min){
                        min = obj[arr[index-1]]
                    }
                }
            })
            console.log('obj',obj,min)
            this.cardObj = obj
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const element = obj[key];
                    if(element%min !== 0){
                        this.cardVal = false
                        return false
                    }     
                }
            }
            this.cardVal = true
             return true
        },
        /*
            种花问题
            [1,0,0,1]
            [1,0,0,0,1]
            [1,0,0,0,0,1]
            [1,0,0,0,0,0,1]
            [0,0,1,0,0,0,0,1]
            1.  遍历数组，判断当前是否为0，如果不为0，则继续往下遍历，否则就判断它的上一个和下一个是否为0，为0则表示可以种植一个
        */
        flowersBtn(){
            const arr = this.flowersInput.split('')
            if(arr.length===1 && arr[0] === '0'){
                this.flowersResult = true
                return true
            }
            let n = 0
            for(let i = 0; i < arr.length; i ++){
                if(arr[i] === '0'){ // 判断当前是否为0
                    // 判断当前是否是第一项,如果第一项是0并且下一项还是0表示可以种植一个
                    if(i===0 && arr[i+1] === '0'){
                        n++
                        i = i + 1
                    }else{ // 如果不是第一项 判断上一项和下一项是否是0，是0表示可以种植
                        if(arr[i-1] === '0' && i === arr.length-1){
                            n++
                            i = i + 1
                        }
                        if(arr[i+1] === '0' && arr[i-1] === '0'){
                            n++
                            i = i + 1
                        }
                    }
                }
            }
            if(n > this.flowersN || n === this.flowersN){
                this.flowersResult = true
                this.flowersOnlyN = ''
                return true
            }
            this.flowersOnlyN = n
            this.flowersResult = false
            return false
        },
        /*
            格雷编码

            解析：

                输入n = 0
                输出： [0]
                0
                长度： 2的0次方 = 1

                输入n = 1
                输出：[0,1] 
                0
                1
                长度： 2的1次方 = 2

                输入n = 2
                输出: [0,1,3,2]
                00 - 0
                01 - 1
                11 - 3
                10 - 2
                长度： 2的2次方 = 4

                输入n = 3
                输出: [0,1,3,2]
                000 - 0
                001 - 1
                011 - 3
                010 - 2
                110 - 6
                111 - 7
                101 - 5
                100 - 4
                长度： 2的3次方 = 8

                根据上述可以总结出，二进制系统的长度就是2的n次方，并且左边第一个数都是以0开始然后是1，后面的数都是以2的n次方除以2对称的


        */
        grayCodeBtn(){
            this.grayCodeBinaryResultArr = this.grayCodeFn(this.grayCodeN)
            this.grayCodeResultArr = this.grayCodeBinaryResultArr.map(item=>{
                return parseInt(item,2)
            })
        },
        // 格蕾数函数封装
        grayCodeFn(n){
            if(n===0){  
                return [0]
            }
            if(n===1){
                return [0,1]
            }
            let result = this.grayCodeFn(n-1)
            let len = Math.pow(2,n)
            let arr1 = []
            let arr2 = []
            for(let i = 0; i < len/2;i++){
                arr1.push(`0${result[i]}`)
                arr2.push(`1${result[i]}`)
            }
            return [...arr1,...arr2.reverse()]
        },
        /*
            重复的子字符串
        */
        repeatSubstrBtn(){
            // \1表示重复正则第一个圆括号内匹配到的内容
            // \2表示重复正则第二个圆括号内匹配到的内容
            // var RegExp = /^(123)(456)\2\1$/;
            // 123456456123
            const reg =  /^(\w+)\1+$/g
            this.repeatSubstrResult = reg.test(this.repeatSubstrInput)
        },
        /*
            正则表达式匹配
            s = "mississippi"
            p = "mis*is*p*."

            1. 通过正则匹配出p中的 mi | s* | i | s* | p* | .，声明一个变量l表示当前匹配到第几项。
            2. 遍历匹配出的数组
            3. 获取每一项的第二个字符，判断是否是*，如果是*,再去判断第一个字符是不是.,是.就直接
               给l赋值为这一项的长度，并且跳出本次循环
            4. 如果不是.,那么就循环判断s[l]是否等于第一个字符，等于就让l加一
            5. 如果每一项的第二个字符不是*,那么就遍历这项，并且用这一项的每个字符去和s[l]进行比较，如果不相等就
               直接返回false,否则就让l++
            6. 如果每一项只有一个字符并且是.那么就直接让l加一
            7. 最后使用l和s字符串的长度进行比较，如果相等表示全部匹配返回true,否则就返回false

        */
        regSubstrBtn () {
            let str = this.regSSubstrInput
            let mode = this.regPSubstrInput
            // .* | a* | dads | .
            const regArr = mode.match(/([a-z.]\**)|([a-z]+(?=([a-z.]\*)|$))|([.]$)|([.])/g)
            let currIndex = 0
            let strLen = str.length
            console.log(regArr)
            debugger
            for(let i = 0,len = regArr.length, m; i < len; i ++) {
                // .* | a* | dads
                m = regArr[i].split('')
                if (m[1] === '*') {
                        if (m[0] === '.') {
                            currIndex += m.length
                            continue
                        } else {
                            while (str[currIndex] === m[0] ) {
                                currIndex ++
                            }
                            if (regArr[i+1] && m[0] === regArr[i+1][0]) {
                                currIndex = currIndex - regArr[i+1].length
                            }
                        }
                } else if(m.length === 1 && m[0] === '.') {
                    currIndex ++
                } else {
                    for(let j = 0, jl = m.length; j < jl; j++) {
                        if (m[j] !== str[currIndex]) {
                            this.regSubResult = false
                            return false
                        } else {
                            currIndex ++
                        }
                    }
                }
            }
            console.log(currIndex,strLen)
            this.regSubResult = currIndex === strLen
            return currIndex === strLen
        },
        /*
            冒泡排序
        */
        bubblingBtn () {
            let arr = this.bubblingInput.split(' ')
            if (!arr.length) {
                return
            }
            for(let i = arr.length - 1, temp; i > 0; i --){
                for(let j = 0; j < i; j ++ ){
                    if(Number(arr[j]) > Number(arr[j+1])){
                        temp = arr[j+1]
                        arr[j+1] = arr[j]
                        arr[j] = temp
                    }
                }
            }
            console.log('arr',arr)
            this.bubblingResult = arr
        },
        /**
         * 选择排序
         */
        selectBtn(){
            let arr = this.selectInput.split(' ')
            if(!arr.length){
                return 
            }
            for(let i = 0,min, z; i < arr.length; i++){
                min = Number(arr[i])
                for(let j = i+1; j < arr.length; j++){
                    if(min > Number(arr[j])){
                        min = arr[j]
                        z = j
                    }
                }
                arr[z] = arr[i]
                arr[i] = min
            }
            this.selectResult = arr
        },
        /*
            最大间距
        */
        maxSpacingBtn(){
            let arr = this.maxSpacingInput.split(' ')
            if(arr.length < 2){
                return 0
            }
            if(arr.length === 2){
                return Math.abs(Number(arr[0])-arr[1])
            }
            let max = 0
            console.log('arr',arr)
            for(let i = arr.length - 1, empt; i > 0; i--){
                debugger
                for(let j = 0; j < i; j ++){
                    if(Number(arr[j]) > Number(arr[j+1])){
                        empt = arr[j+1]
                        arr[j+1] = arr[j]
                        arr[j] = empt
                    }
                }
                if(i !== arr.length - 1 ){
                    let val = Number(arr[i+1]) -  Number(arr[i])
                    if(val >  Number(max)){
                        max = val
                    }
                }
            }
            this.maxSpacingResult = max
        },
        /**
         * 按奇偶排序数组
         */
        oddEvenBtn(){
            let arr = this.oddEvenInput.split(' ')
            let oddArr = []
            let evenArr = []
            arr.forEach(item=>{
                if(item%2===0){ // 偶数
                    oddArr.push(item)
                }else{  // 奇数
                    evenArr.push(item)
                }
            })
            this.oddEvenResult = [...oddArr,...evenArr]
            return [...oddArr,...evenArr]
        },
        /**\
         * 按奇偶排序数组2
         */
        oddEvenBtn2(){
            let arr = this.oddEvenInput2.split(' ')
            let resultArr = []
            let oddIndex = 0
            let evenIndex = 1
            arr.forEach((item,index) => {
                console.log(item,item&1,(item&1) === 0)
                if((item&1) === 0){ // 偶数
                    resultArr[oddIndex] = item
                    oddIndex +=2
                } else {
                    resultArr[evenIndex] = item
                    evenIndex +=2
                }
            })
            this.oddEvenResult2 = resultArr
            return resultArr
        },
        // 数组中的第k个最大元素
        arrMaxKBtn(){
            const arr = this.arrMaxKInput.split(" ")
            // 利用冒泡排序的特点 每排列一次就可以得到当前排列的最大值，所以利用这个特点不需要排序整个数组就可以得到答案
            for(let i = arr.length - 1,tem; i > 0; i --){
                for(let j = 0; j < i; j ++){
                    if(arr[j] > arr[j+1]){
                        tem = arr[j+1]
                        arr[j+1] = arr[j]
                        arr[j] = tem
                    }
                }
                if(Number(this.arrMaxk) === arr.length - i){
                    this.arrMaxKVal = arr[i]
                    return
                }
            }
        },
        // 缺失的第一个正数
        losePositiveNumBtn(){
            const arr = this.losePositiveNumInput.split(' ')
            if(!arr.length){
                this.losePositiveNumVal = 1
                return 1
            }
            let z = 1
            let obj = {}
            // 冒泡降序
            for(let i = arr.length - 1,tem; i >= 0; i --){
                for(let j = 0; j < i; j++){
                    if(arr[j] < Number(arr[j+1])){
                        tem = arr[j+1]
                        arr[j+1] = arr[j]
                        arr[j] = tem
                    }
                    
                }
                console.log(obj,arr[i])
                if(obj[arr[i]]){ // 去重
                  arr.splice(i,1)        
                  arr[i] > 0 && z-- // 正数才减一
                }
                obj[arr[i]] = true
                // 正数并且不等于z的时候就返回这个z
                if(Number(arr[i]) > 0 && Number(arr[i]) !== z){
                    this.losePositiveNumVal = z
                    return z
                }
                // 正数才加1
                if(Number(arr[i]) > 0){
                    z++
                }
            }
            this.losePositiveNumVal = z
            return z

            // 方法2
            let len = arr.length
            for(let i = 0; i < len; i++){
                while(arr[i] > 0 && arr[i] <= len && arr[i] !== arr[arr[i]-1]){
                    let temp = arr[i]
                    arr[i] = arr[arr[i]-1]
                    arr[arr[i]-1] = temp
                }
            }

            for(let i = 0; i < len; i++){
                if(arr[i] !== i + 1){
                    return i + 1
                }
            }
            return len + 1
        }
    }
}
</script>

<style lang='less'>
    .key{
        width: 310px;
        display: flex;
        justify-content: start;
        flex-wrap: wrap;
        margin-top: 50px;
        span {
            border: 1px solid #ccc;
            width: 100px;
            box-sizing: border-box;
            font-size: 12px;
            text-align: center;
            height: 30px;
            line-height: 30px;
            i{
                font-size: 14px;
                font-style: normal;
                font-weight: bolder;
                margin-right: 4px;
            }
        }
        span:active{
            background: cornflowerblue;
        }
    }
</style>

