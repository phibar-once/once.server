// TODO@MERGE remove npm dependency when moving back Server to own module
import fastify from "fastify";
import { BaseNodeOnce } from "ior:esm:/tla.EAM.Once[dev]";
import { EAMD } from "ior:esm:/tla.EAM.Once[dev]";
import { OnceMode, OnceState } from "ior:esm:/tla.EAM.Once[dev]";

export default class OnceNodeServer extends BaseNodeOnce {
  ENV = process.env;
  creationDate: Date;
  mode = OnceMode.NODE_JS;
  state = OnceState.INITIALIZED;
  runningPort: number | undefined;



  constructor(eamd: EAMD) {
    super(eamd);
    this.creationDate = new Date();
  }
  global: typeof globalThis = global;
  async start(): Promise<void> {

    let server = fastify();

    server.get("/", async (request, reply) => {
      reply.type("application/json").code(200);
      return { hello: "once!!!" };
    });

    this.runningPort = 3000;

    try {
      server.listen(3000, (err, address) => {
        if (err) throw err;
        console.log(`App listening on ${address}`);
      });
    } catch (err) {
      console.error(err);
    }
    console.log("ONCE STARTED AS NODE_JS WITH EXTERNAL MODULE");
  }
}
