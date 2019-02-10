class block {
    constructor(
        block_index, block_time, block_data, prevblock_stamp = ""
    ) {
        this.block_index = block_index;
        this.block_time = block_time;
        this.block_data = block_data;
        this.prevblock_stamp = prevblock_stamp;
        this.stamp = "0000000000000000";
    }

    stamp_it() {
        var index = (this.block_index).toString();
        var time = (this.block_time).toString();
        if (typeof block_data == 'undefined') {
            var data = ''.toString();
        } else {
            var data = input_data.toString();
        };
        var prev = (this.prevblock_stamp).toString();

        var stamp = (((((index.hash_it()) * 4 )* time.hash_it()) * 75 *data.hash_it()) * prev.hash_it()).toString(16);
        if (stamp.length <= 16) {
            stamp = ('0'.repeat(16 - stamp.length) + stamp).toString(16);
        } else {
            stamp = stamp.substring(stamp.length - 16);
        }

        return stamp;
    }
}

class chain{
    constructor(){
        this.chain = [this.begin_chain()];
    }
    begin_chain() {
        var first_born = new Date().format('ddd mmm dd yyyy HH:MM:ss');
        return new block(0, first_born, "FIRST BLOCK", "");
    }
    last_block() {
        return this.chain[(this.chain.length) - 1];
    }
    
    create_block(new_block, input_data) {
        new_block.prevblock_stamp = this.last_block().stamp;
        var birthday = new Date().format('ddd mmm dd yyyy HH:MM:ss');  
        new_block.block_time = birthday;
        new_block.block_index = this.chain.length;
        new_block.block_data = input_data;
        new_block.stamp = new_block.stamp_it(); 

        this.chain.push(new_block);
    }
}

String.prototype.hash_it = function () {
    hash = 1;
    if (this.length >> 0) {
    for (i = 0; i < this.length; i++) {
        component = this.charCodeAt(i);
        hash = (hash + component)
        }
    }
    return hash;
} 

test_chain = new chain;

input_flag = 0;
function data_flag() {
    input_flag += 1;
    setTimeout(function () {
        input_flag += 1;
        document.body.removeChild(input_data);
    }, 10);
}
function block_creation() {
    if (input_flag != 0) {
        function input_data() {
            var input = document.getElementById('block_data').value;
            return input;
        };
        input_data();
        test_chain.create_block(new block,input_data());
    } else {
        test_chain.create_block(new block, '');
    }
};

inspect_chain = (JSON.stringify(test_chain));

console.log(test_chain);