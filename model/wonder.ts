import client from "../db/MySqlClient.ts";
import { Wonder } from "../types/Wonder.ts";

interface Key {
    id?: any 
}

export async function isSatisfiedBy(id:number) {
    const result = await client.query(`SELECT COUNT(*) count FROM wonder WHERE id = ?`, [id]);
    return result[0].count >= 1;
}

export async function search(params:Key = {}) {
    const isSpecific = Object.keys(params).length
    if (isSpecific) {
        return await client.execute(`SELECT * FROM wonder WHERE id = ?`, [params.id]);
    } else {
        return await client.execute(`SELECT * FROM wonder`);   
    }
}

export async function insert(wonder: Wonder) {
    return await client.execute(`INSERT INTO wonder(title, description, icon, created_date, modified_date, status) VALUES (?,?,?,?,?,?)`, [
       wonder.title, wonder.description, wonder.icon, new Date(), new Date(), wonder.status
    ]);
}

export async function update(wonder: Wonder) {
    return await client.execute(`UPDATE wonder SET title= ?, description= ?, icon= ?, modified_date= ?  WHERE id = ?`, [
        wonder.title, wonder.description, wonder.icon, new Date(), wonder.id 
    ]);
}

export async function remove(id: number) {
    return await client.execute(`DELETE FROM wonder WHERE id = ?`, [id]); 
}
