import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0x18A9ADcD4810578A724F3D51833c9CC6fd4DeE20",
        abi as any,
        signer
    );
}