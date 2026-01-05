import * as crypto from "crypto";

interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}
class Block implements BlockShape {
  public hash: string;
  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }
  static calculateHash(prevHash: string, height: number, data: string) {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash("sha256").update(toHash).digest("hex");
  }
}
class Blockchain {
  private blocks: Block[];
  constructor() {
    this.blocks = []; // 빈 배열로 초기화
  }
  private getPrevHash() {
    if (this.blocks.length === 0) return "";
    return this.blocks[this.blocks.length - 1].hash;
  }
  public addBlock(data: string) {
    const newBlock = new Block(
      this.getPrevHash(),
      this.blocks.length + 1,
      data
    );
    this.blocks.push(newBlock);
  }
  public getBlocks() {
    // return this.blocks;
    return [...this.blocks]; // 배열 형태로 해서 새로운 블록이 와서 해킹 시도하려고 해도 막음.
  }
}

const blockchain = new Blockchain();

blockchain.addBlock("첫 번째 블록");
blockchain.addBlock("두 번째 블록");
blockchain.addBlock("세 번째 블록");
blockchain.addBlock("네 번째 블록");

blockchain.getBlocks().push(new Block("hacking test", 11111, "hacking data"));

console.log(blockchain.getBlocks());
