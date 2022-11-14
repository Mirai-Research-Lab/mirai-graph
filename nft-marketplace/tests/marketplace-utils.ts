import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  BoughtItem,
  ItemAdded,
  ItemCancelled
} from "../generated/Marketplace/Marketplace"

export function createBoughtItemEvent(
  nftAddres: Address,
  buyer: Address,
  seller: Address,
  tokenId: BigInt,
  price: BigInt
): BoughtItem {
  let boughtItemEvent = changetype<BoughtItem>(newMockEvent())

  boughtItemEvent.parameters = new Array()

  boughtItemEvent.parameters.push(
    new ethereum.EventParam("nftAddres", ethereum.Value.fromAddress(nftAddres))
  )
  boughtItemEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  boughtItemEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  boughtItemEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  boughtItemEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return boughtItemEvent
}

export function createItemAddedEvent(
  nftAddress: Address,
  tokenId: BigInt,
  price: BigInt,
  seller: Address
): ItemAdded {
  let itemAddedEvent = changetype<ItemAdded>(newMockEvent())

  itemAddedEvent.parameters = new Array()

  itemAddedEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  itemAddedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  itemAddedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  itemAddedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )

  return itemAddedEvent
}

export function createItemCancelledEvent(
  seller: Address,
  nftAddress: Address,
  tokenId: BigInt
): ItemCancelled {
  let itemCancelledEvent = changetype<ItemCancelled>(newMockEvent())

  itemCancelledEvent.parameters = new Array()

  itemCancelledEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  itemCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  itemCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return itemCancelledEvent
}
