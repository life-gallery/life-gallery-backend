import { ServerType, imageRequestBody } from "../types/type";
import { FastifyRequest, FastifyReply, FastifyPluginOptions } from "fastify";
import { findUserByKakaoId, saveUser } from "../service/UserService";
import { User } from "../entity/user";
import fp from "fastify-plugin";
import { extractImageUrl } from "../utils/stringModify";
import { Post } from "../entity/post";
import { savePost } from "../service/PostService";

const imageRouter = fp(async (server: ServerType, opts: FastifyPluginOptions) => {
  server.post("/image", async (req: FastifyRequest<any>, res: FastifyReply) => {
    const requestBody: imageRequestBody = req.body;

    server.log.info("----------------------IMAGE------------------------");
    server.log.info(requestBody);
    server.log.info("---------------------------------------------------");

    let user = await findUserByKakaoId(server, requestBody.userRequest.user.id);
    if (!user) {
      user = new User();
      user.kakao_id = requestBody.userRequest.user.id;
      user.full_name = " ";
      user.nick_name = " ";
      user.user_state = 2;
      await saveUser(server, user);
    }
    const post = new Post();
    const images = requestBody.contexts.map((context) => extractImageUrl(context.params.secureimage.value));
    post.user = user;
    post.title = " ";
    post.image_link = images[0];
    post.draft_state = 1;
    await savePost(server, post);

    res.send({
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: "이미지 등록이 완료되었습니다. 제목을 입력해주세요."
            }
          }
        ]
      }
    });
  });
});

export default imageRouter;
