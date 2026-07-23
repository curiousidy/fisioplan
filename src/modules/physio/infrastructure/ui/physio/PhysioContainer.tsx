import { findAllUseCase } from "@/modules/physio/application/findAll/FindAllUseCase";
import { prismaPhysioRepository } from "@/modules/physio/infrastructure/PrismaPhysioRepository";
import { PhysioComponent } from "./PhysioComponent";

const PhysioContainer = async () => {
  const physioList = await findAllUseCase(prismaPhysioRepository);
  return (
    <PhysioComponent physioList = {physioList}/>
  )
}

export default PhysioContainer