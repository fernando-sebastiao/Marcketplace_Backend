export interface managerDTO{
    name        :string,
    password    :string,
    email       :string,
    tel    :string,
    created_at  :Date,
    update_at   :Date
}

export interface managerAuth{
    email: string
    filialId: string
    password:string
}