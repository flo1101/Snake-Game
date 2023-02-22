
class Node {
    constructor(value) {
        this.next = null;
        this.prev = null;
        this.x = value[0];
        this.y = value[1];
    }

    getValue() {
        return [this.x, this.y];
    }
}

class Snake {

    constructor(values) {
        values.forEach((value, i) => {
            if (i === 0) {
                this.head = new Node(value);
                this.tail = this.head;
            } else {
                const newNode = new Node(value);
                newNode.prev = this.tail;
                this.tail.next = newNode;
                this.tail = newNode;
            }
        })
    }

    grow() {
        const newTail = new Node([this.tail.x, this.tail.y]);
        // if ()
    }

    move(direction) {
        this.moveHead(direction);
        this.moveTail()
    }

    moveHead(direction) {
        const newHead = new Node([this.head.x, this.head.y]);
        switch (direction) {
            case "u":
                newHead.y -= 1;
                break;
            case "d":
                newHead.y += 1;
                break;
            case "r":
                newHead.x += 1;
                break;
            case "l":
                newHead.x -= 1;
                break;
        }
        newHead.next = this.head;
        this.head.prev = newHead;
        this.head = newHead;
    }

    moveTail() {
        this.tail = this.tail.prev;
        this.tail.next = null;
    }
}

export default Snake;