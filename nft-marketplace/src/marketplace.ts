import { BigInt, Address } from "@graphprotocol/graph-ts";
import {
  BoughtItem as BoughtItemEvent,
  ItemAdded as ItemAddedEvent,
  ItemCancelled as ItemCancelledEvent,
} from "../generated/Marketplace/Marketplace";

import {
  ItemAdded,
  ActiveItem,
  BoughtItem,
  ItemCancelled,
} from "../generated/schema";

export function handleBoughtItem(event: BoughtItemEvent): void {
  let itemBought = BoughtItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddres)
  );
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddres)
  );
  if (!itemBought) {
    itemBought = new BoughtItem(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddres)
    );
  }
  itemBought.buyer = event.params.buyer;
  itemBought.nftAddress = event.params.nftAddres;
  itemBought.tokenId = event.params.tokenId;
  activeItem!.buyer = event.params.buyer;

  itemBought.save();
  activeItem!.save();
}

export function handleItemAdded(event: ItemAddedEvent): void {
  let itemListed = ItemAdded.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  if (!itemListed) {
    itemListed = new ItemAdded(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }
  if (!activeItem) {
    activeItem = new ActiveItem(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }
  itemListed.seller = event.params.seller;
  activeItem.seller = event.params.seller;

  itemListed.nftAddress = event.params.nftAddress;
  activeItem.nftAddress = event.params.nftAddress;

  itemListed.tokenId = event.params.tokenId;
  activeItem.tokenId = event.params.tokenId;

  itemListed.price = event.params.price;
  activeItem.price = event.params.price;

  activeItem.buyer = Address.fromString(
    "0x0000000000000000000000000000000000000000"
  );

  itemListed.save();
  activeItem.save();
}

export function handleItemCancelled(event: ItemCancelledEvent): void {
  let itemCanceled = ItemCancelled.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  if (!itemCanceled) {
    itemCanceled = new ItemCancelled(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }
  itemCanceled.seller = event.params.seller;
  itemCanceled.nftAddress = event.params.nftAddress;
  itemCanceled.tokenId = event.params.tokenId;
  activeItem!.buyer = Address.fromString(
    "0x000000000000000000000000000000000000dEaD"
  );

  itemCanceled.save();
  activeItem!.save();
}

// Returns a unique ID for the entity

function getIdFromEventParams(tokenId: BigInt, nftAddress: Address): string {
  return tokenId.toHexString() + nftAddress.toHexString();
}
