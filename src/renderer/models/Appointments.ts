interface Appointments {
    apmt_id: string;
    pt_id: string;
    apmt_title: string;
    apmt_time: string;
    apmt_slot: number;
    m_id: string;
    u_id: string;
    m_name: string;
    m_mac_address: string;
    u_national_id: string;
    r_id: string;
    u_username: string;
    u_password: string;
    prf_id: string;
    prf_name: string;
    u_first_name: string;
    u_last_name: string;
    created_at: Date;
    updated_at: Date;
}

export default Appointments;