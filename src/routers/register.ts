import { ServerType } from "../types/type";
import { FastifyRequest, FastifyReply } from "fastify";

const registerRouter = async (server: ServerType) => {
  server.post("/register", async (req: FastifyRequest, res: FastifyReply) => {
    res.send({
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: "작품 등록 절차를 진행합니다. 개인 정보 제공에 동의하시겠습니까?"
          }
        ],
        quickReplies: [
          {
            label: "개인 정보 제공 동의",
            action: "block",
            messageText: "이미지를 등록해주세요.",
            blockId: "61ee39c2bce5c65875ef3a2e"
          },
          {
            label: "개인 정보 제공 비동의",
            action: "message",
            messageText: "작품 등록 절차를 취소합니다."
          }
        ]
      }
    });
  });
};

export default registerRouter;