import { DeleteResult, Repository, UpdateResult } from "typeorm";
import Friendship from "./Friendship.entity";
import { TypeOfFriendship } from "@Types/Friendship";
import UserService from "User/user.service";
import User from "User/user.entity";

export default class FriendshipService {
  constructor(private readonly repository: Repository<Friendship>, private readonly userService: UserService) {}

  async FindAllByUser(idUser: number): Promise<Friendship[]> {
    const result = await this.repository.find({
      relations: {
        UserSource: true,
        UserTarget: true,
      },
      select: {
        UserSource: {
          id: true,
          Nickname: true,
          Level: true,          
        },
        UserTarget: {
          id: true,
          Nickname: true,
          Level: true,
        },
      },
      where: [{ UserSource: { id: idUser } }, { UserTarget: { id: idUser } }],
    });
    return result;
  }

  async CreateFriendshipRequest(userSource: number, userTarget: number) {
    try {
      const friendShip: Friendship = this.repository.create({
        UserSource: { id: userSource },
        UserTarget: { id: userTarget },
        Type: TypeOfFriendship.requested,
      });
      await this.repository.save(friendShip);
    } catch (error: any) {
      if (typeof error === "string") throw new Error(error);
      else if (error instanceof Error) throw new Error(error.message);
      else {
        console.log(error);
        throw new Error("Erro não catalogado, verificar o log no servidor");
      }
    }
  }

  async CheckIfItAlreadyExists(idSource: number, idTarget: number) {
    const result: Friendship[] = await this.repository.findBy([
      { UserSource: { id: idSource }, UserTarget: { id: idTarget } },
      { UserSource: { id: idTarget }, UserTarget: { id: idSource } },
    ]);
    // await this.repository.findBy()

    return result.length > 0;
  }

  async ReactToFriendRequest(react: boolean, userId: number, friendId: number) {
    const friendShip = await this.FindOneById(friendId);
    if (!friendShip) throw new Error("Friendship not found");
    if (friendShip.UserTarget.id != userId) throw new Error("Only the recipient can react to the request");
    if (react) await this.repository.update(friendId, { ...friendShip, Type: TypeOfFriendship.friend });
    else await this.repository.delete(friendId);
  }

  async FindOneById(id: number): Promise<Friendship | null> {
    try {
      const result = await this.repository.findOne({ where: { id } });
      return result;
    } catch (error: any) {
      if (typeof error === "string") throw new Error(error);
      else if (error instanceof Error) throw new Error(error.message);
      else {
        console.log(error);
        throw new Error("Erro não catalogado, verificar o log no servidor");
      }
    }
  }

  async Delete(id: number): Promise<boolean> {
    const modelFinded: Friendship | null = await this.FindOneById(id);
    if (!modelFinded) throw new Error("Friendship não encontrado");

    try {
      const resultDelete: DeleteResult = await this.repository.delete({ id: id });
      return resultDelete.affected! > 0;
    } catch (error: any) {
      if (typeof error === "string") throw new Error(error);
      else if (error instanceof Error) throw new Error(error.message);
      else {
        console.log(error);
        throw new Error("Erro não catalogado, verificar o log no servidor");
      }
    }
  }
  /*
  async FindAll(): Promise<Friendship[]> {
    try {
      return await this.repository.find();
    } catch (error: any) {
      if (typeof error === "string") throw new Error(error);
      else if (error instanceof Error) throw new Error(error.message);
      else {
        console.log(error);
        throw new Error("Erro não catalogado, verificar o log no servidor");
      }
    }
  }


  async Create(model: Friendship): Promise<Friendship> {
    try {
      const modelCreated = this.repository.create(model);
      return await this.repository.save(modelCreated);
    } catch (error: any) {
      if (typeof error === "string") throw new Error(error);
      else if (error instanceof Error) throw new Error(error.message);
      else {
        console.log(error);
        throw new Error("Erro não catalogado, verificar o log no servidor");
      }
    }
  }

  async Update(id: number, model: Friendship): Promise<boolean> {
    const modelFinded: Friendship | null = await this.FindOneById(id);
    if (!modelFinded) throw new Error("Friendship não encontrado");

    try {
      const modelCreated = this.repository.create(model);
      const resultUpdate: UpdateResult = await this.repository.update(id, modelCreated);
      return resultUpdate.affected! > 0;
    } catch (error: any) {
      if (typeof error === "string") throw new Error(error);
      else if (error instanceof Error) throw new Error(error.message);
      else {
        console.log(error);
        throw new Error("Erro não catalogado, verificar o log no servidor");
      }
    }
  }

  */
}
