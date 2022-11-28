import AppDataSource from "../Database/DataSource";
import RelationshipController from "./Relationship.controller";
import Relationship from "./Relationship.entity";
import RelationshipService from "./Relationship.service";

const repository = AppDataSource.getRepository<Relationship>(Relationship);
const relationshipService: RelationshipService = new RelationshipService(repository);
const relationshipController: RelationshipController = new RelationshipController(relationshipService);

export { relationshipService, relationshipController };
