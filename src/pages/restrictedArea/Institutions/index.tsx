import { SetStateAction, useState } from "react"
import { envs } from "../../../utils/envs"
import InstituteCard from "../../../components/InstituteCard"
import { MagnifyingGlass } from "@phosphor-icons/react"

const institutes = [
    {
        "institute_id": "1",
        "name": "Instituto de Exemplo",
        "description": "Um instituto dedicado à educação de qualidade.",
        "institute_type": "ESTABELECIMENTO_FIXO",
        "partner_type": "PROMOTER_PARTNER",
        "phone": "123456789",
        "logo_photo": "url_para_logo.jpg",
        "address": "Rua Exemplo, 123",
        "price": 100,
        "district_id": "district_1",
        "photos_url": [
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
        ],
        "events_id": [
            "event_1",
            "event_2",
            "event_3",
            "event_4",
            "event_5",
            "event_6"
        ]
    },
    {
        "institute_id": "2",
        "name": "Instituto de Exemplo 2",
        "description": "Um instituto dedicado à educação de qualidade.",
        "institute_type": "ESTABELECIMENTO_FIXO",
        "partner_type": "PROMOTER_PARTNER",
        "phone": "123456789",
        "logo_photo": "url_para_logo.jpg",
        "address": "Rua Exemplo, 123",
        "price": 100,
        "district_id": "district_1",
        "photos_url": [
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
        ],
        "events_id": [
            "event_1",
            "event_2",
            "event_3",
            "event_4",
            "event_5",
            "event_6"
        ]
    },
    {
        "institute_id": "1",
        "name": "Instituto de Exemplo",
        "description": "Um instituto dedicado à educação de qualidade.",
        "institute_type": "ESTABELECIMENTO_FIXO",
        "partner_type": "PROMOTER_PARTNER",
        "phone": "123456789",
        "logo_photo": "url_para_logo.jpg",
        "address": "Rua Exemplo, 123",
        "price": 100,
        "district_id": "district_1",
        "photos_url": [
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
        ],
        "events_id": [
            "event_1",
            "event_2",
            "event_3",
            "event_4",
            "event_5",
            "event_6"
        ]
    },
    {
        "institute_id": "2",
        "name": "Instituto de Exemplo 2",
        "description": "Um instituto dedicado à educação de qualidade.",
        "institute_type": "ESTABELECIMENTO_FIXO",
        "partner_type": "PROMOTER_PARTNER",
        "phone": "123456789",
        "logo_photo": "url_para_logo.jpg",
        "address": "Rua Exemplo, 123",
        "price": 100,
        "district_id": "district_1",
        "photos_url": [
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
        ],
        "events_id": [
            "event_1",
            "event_2",
            "event_3",
            "event_4",
            "event_5",
            "event_6"
        ]
    },
    {
        "institute_id": "1",
        "name": "Instituto de Exemplo",
        "description": "Um instituto dedicado à educação de qualidade.",
        "institute_type": "ESTABELECIMENTO_FIXO",
        "partner_type": "PROMOTER_PARTNER",
        "phone": "123456789",
        "logo_photo": "url_para_logo.jpg",
        "address": "Rua Exemplo, 123",
        "price": 100,
        "district_id": "district_1",
        "photos_url": [
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
        ],
        "events_id": [
            "event_1",
            "event_2",
            "event_3",
            "event_4",
            "event_5",
            "event_6"
        ]
    },
    {
        "institute_id": "2",
        "name": "Instituto de Exemplo 2",
        "description": "Um instituto dedicado à educação de qualidade.",
        "institute_type": "ESTABELECIMENTO_FIXO",
        "partner_type": "PROMOTER_PARTNER",
        "phone": "123456789",
        "logo_photo": "url_para_logo.jpg",
        "address": "Rua Exemplo, 123",
        "price": 100,
        "district_id": "district_1",
        "photos_url": [
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
        ],
        "events_id": [
            "event_1",
            "event_2",
            "event_3",
            "event_4",
            "event_5",
            "event_6"
        ]
    },
    {
        "institute_id": "1",
        "name": "Instituto de Exemplo",
        "description": "Um instituto dedicado à educação de qualidade.",
        "institute_type": "ESTABELECIMENTO_FIXO",
        "partner_type": "PROMOTER_PARTNER",
        "phone": "123456789",
        "logo_photo": "url_para_logo.jpg",
        "address": "Rua Exemplo, 123",
        "price": 100,
        "district_id": "district_1",
        "photos_url": [
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
        ],
        "events_id": [
            "event_1",
            "event_2",
            "event_3",
            "event_4",
            "event_5",
            "event_6"
        ]
    },
    {
        "institute_id": "2",
        "name": "Instituto de Exemplo 2",
        "description": "Um instituto dedicado à educação de qualidade.",
        "institute_type": "ESTABELECIMENTO_FIXO",
        "partner_type": "PROMOTER_PARTNER",
        "phone": "123456789",
        "logo_photo": "url_para_logo.jpg",
        "address": "Rua Exemplo, 123",
        "price": 100,
        "district_id": "district_1",
        "photos_url": [
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
        ],
        "events_id": [
            "event_1",
            "event_2",
            "event_3",
            "event_4",
            "event_5",
            "event_6"
        ]
    },
    {
        "institute_id": "1",
        "name": "Instituto de Exemplo",
        "description": "Um instituto dedicado à educação de qualidade.",
        "institute_type": "ESTABELECIMENTO_FIXO",
        "partner_type": "PROMOTER_PARTNER",
        "phone": "123456789",
        "logo_photo": "url_para_logo.jpg",
        "address": "Rua Exemplo, 123",
        "price": 100,
        "district_id": "district_1",
        "photos_url": [
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
        ],
        "events_id": [
            "event_1",
            "event_2",
            "event_3",
            "event_4",
            "event_5",
            "event_6"
        ]
    },
    {
        "institute_id": "2",
        "name": "Instituto de Exemplo 2",
        "description": "Um instituto dedicado à educação de qualidade.",
        "institute_type": "ESTABELECIMENTO_FIXO",
        "partner_type": "PROMOTER_PARTNER",
        "phone": "123456789",
        "logo_photo": "url_para_logo.jpg",
        "address": "Rua Exemplo, 123",
        "price": 100,
        "district_id": "district_1",
        "photos_url": [
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
            "url_para_foto_1.jpg",
            "url_para_foto_2.jpg",
        ],
        "events_id": [
            "event_1",
            "event_2",
            "event_3",
            "event_4",
            "event_5",
            "event_6"
        ]
    },
]


export default function Institutions() {
    const [search, setSearch] = useState("")
    const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
        setSearch(e.target.value)
    }
    return (
        <div className="h-full w-full flex flex-col bg-[#151515]" >
            <div className="h-[16vh] w-full flex flex-col py-6 bg-[#2A2A2A] items-center gap-10 px-14 border-b-2 border-[#6A6A6A]" >
                <div className="flex h-full items-center w-full justify-between">
                    <div className="flex h-full items-center gap-4">
                        <div className="h-16 px-4 rounded-lg flex justify-center items-center w-[34vw] text-white text-3xl bg-[#6A6A6A] placeholder:text-white">
                            <MagnifyingGlass size={32} />
                            <input type="text" value={search} onChange={handleChange} placeholder="Pesquisar" className="h-16 px-4 rounded-lg w-full text-white text-3xl bg-[#6A6A6A] placeholder:text-white" />
                        </div>
                        <button className="h-16 w-16 rounded-lg bg-light-purple text-white text-2xl hover:bg-purple">+</button>
                        <h1 className="text-white text-3xl">Nova Instituição</h1>
                    </div>
                    <div>
                        <img src={`${envs.cloudfrontUrl}/approle_logo_navbar.png`} alt="AppRole Logo" className="h-16" />
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap h-[84vh] overflow-y-auto justify-center gap-4 pt-6">
                {institutes.map((institute) => {
                    return (
                        <div>
                            <InstituteCard name={institute.name} imageUrl={institute.logo_photo} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}