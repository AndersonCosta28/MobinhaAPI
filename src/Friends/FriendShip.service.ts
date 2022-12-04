import { DeleteResult, Repository, UpdateResult } from "typeorm";
import FriendShip from "./FriendShip.entity";
import { TypeOfFriendShip } from "../Types/FriendShip";

export default class FriendsService {
  constructor(private readonly repository: Repository<FriendShip>) {}

  async FindAllByUser(idUser: number): Promise<FriendShip[]> {
    const result = await this.repository.findBy([{ SourceId: idUser }, { TargetId: idUser }]);

    return result;
  }

  async CreateFriendshipRequest(userSource: number, userTarget: number) {
    try {
      const friendShip = this.repository.create({
        SourceId: userSource,
        TargetId: userTarget,
        Type: TypeOfFriendShip.requested,
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
    const result: FriendShip[] = await this.repository.findBy([
      { SourceId: idSource, TargetId: idTarget },
      { SourceId: idTarget, TargetId: idSource },
    ]);

    return result.length > 0;
  }

  async ReactToFriendRequest(react: boolean, userId: number, friendId: number) {
    const friendShip = await this.FindOneById(friendId);
    if (!friendShip) throw new Error("FriendShip not found");
    if(friendShip.TargetId != userId) throw new Error("Only the recipient can react to the request");
    if (react) await this.repository.update(friendId, { ...friendShip, Type: TypeOfFriendShip.friend });
    else await this.repository.delete(friendId);
  }

  async FindOneById(id: number): Promise<FriendShip | null> {
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
    const modelFinded: FriendShip | null = await this.FindOneById(id);
    if (!modelFinded) throw new Error("FriendShip não encontrado");

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
  async FindAll(): Promise<FriendShip[]> {
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


  async Create(model: FriendShip): Promise<FriendShip> {
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

  async Update(id: number, model: FriendShip): Promise<boolean> {
    const modelFinded: FriendShip | null = await this.FindOneById(id);
    if (!modelFinded) throw new Error("FriendShip não encontrado");

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
