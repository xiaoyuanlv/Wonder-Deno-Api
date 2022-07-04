import client from "../db/MySqlClient.ts";
import * as wonderModel from "../model/wonder.ts";
import { Wonder } from "../types/Wonder.ts";

export async function addWonder ({ request, response }: { request: any; response: any }) {
    const value = await request.body().value;
    const info: Wonder = value;
    let status = 200;

    if (info.hasOwnProperty('title') && info.hasOwnProperty('description')) {
      response.body = await wonderModel.insert(info);
    } else {
      response.body = { "error": "Invalid request!" };
      status = 404;
    }

    response.status = status;
}


export async function updateWonder ({ request, response, params }: { request: any; response: any; params: any }) {
    const value = await request.body().value;
    const info: Wonder = value;
    const hasRecord = await wonderModel.isSatisfiedBy(params.id);
    let responseMessage = {};
    let status = 200;

    if (hasRecord) {
      responseMessage = await wonderModel.update(info);
    } else {
      responseMessage = { "error": "Wonder not found!" };
      status = 404;
    }

    response.body = responseMessage;
    response.status = status;
}

export async function getAllWonders ({ response }: {response:any}) {
    const result = await wonderModel.search();
    response.body = result.rows;
}

export async function getWonder ({ params, response }: {params: any; response:any}) {
    const hasRecord = await wonderModel.isSatisfiedBy(params.id);
    let status = 200;

    if (hasRecord) {
      const result = await wonderModel.search(params);
      response.body = result.rows;
    } else {
      response.body = { "error": "Wonder not found!" };
      status = 404;
    }

    response.status = status;
}

export async function removeWonder ({ params, response }: { params: any; response: any }) {
    const hasRecord = await wonderModel.isSatisfiedBy(params.id);
    let responseMessage = {};
    let status = 204;

    if (hasRecord) {
      wonderModel.remove(params.id);
    } else {
      responseMessage = { "error": "Wonder not found!" };
      status = 404;
    }

    if(status != 204) {
      response.body = responseMessage
    }
    response.status = status
}