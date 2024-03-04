import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0x44fa57DF7462a88b59Eb852e037E50C8685e2aB9",
        abi as any,
        signer
    );
}