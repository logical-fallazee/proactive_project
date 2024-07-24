"use server";

import { promises as fs } from "fs";
import path from "path";

import {
  ProductPriceFilter,
  ProductCategoryFilter,
} from "@/app/all-products/types";

export async function getProducts() {
  try {
    const jsonPath = path.join(process.cwd(), "app", "test_data.json");
    const result = await fs.readFile(jsonPath, "utf-8");
    const body = JSON.parse(result);

    return { body, status: 200 };
  } catch (error) {
    console.log(error);
  }
}

export async function getProductsInPages(page: number, limit: number) {
  try {
    const result = await fs.readFile(
      process.cwd() + "/app/test_data.json",
      "utf-8",
    );
    const body = JSON.parse(result);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    return {
      body: body.slice(startIndex, endIndex),
      status: 200,
      pages: Math.ceil(body.length / limit),
      total: body.length,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getPricedProductsInPages(
  page: number,
  limit: number,
  filter: string,
) {
  try {
    const result = await fs.readFile(
      process.cwd() + "/app/test_data.json",
      "utf-8",
    );
    const body = JSON.parse(result);
    let filteredBody = body;

    if (filter === ProductPriceFilter.LOW_TO_HIGH) {
      filteredBody = filteredBody.sort((a, b) => a.price - b.price);
    } else if (filter === ProductPriceFilter.HIGH_TO_LOW) {
      filteredBody = filteredBody.sort((a, b) => b.price - a.price);
    } else if (filter === ProductPriceFilter.LESS_THAN_200) {
      filteredBody = filteredBody.filter((product) => product.price < 200);
    } else {
      // do nothing
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    return {
      body: filteredBody.slice(startIndex, endIndex),
      status: 200,
      pages: Math.ceil(filteredBody.length / limit),
      total: filteredBody.length,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function fetchProductsInPages(page: number, limit: number) {
  const result = await getProductsInPages(page, limit);

  return result;
}

export async function fetchFilteredProductsInPages(
  page: number,
  limit: number,
  filter: string,
) {
  const result = await getPricedProductsInPages(page, limit, filter);

  return result;
}
