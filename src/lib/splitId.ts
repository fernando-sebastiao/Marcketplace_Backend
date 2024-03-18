export default function SplitId(id:string){
    const oldiD=id.split("-")
    return `${oldiD[0]}+${oldiD[oldiD.length - 1]}...`
}