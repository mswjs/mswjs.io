---
order: 6
title: Error handling
description: Differentiate and handle the errors thrown by the library.
---

Data provides multiple error classes to help you differentiate and handle different errors.

## `OperationError`

- `code` `<OperationErrorCode>`, the error code describing the failed operation;
- `cause` `<Error>` (_optional_), a reference to the original thrown error.

Thrown whenever performing a record operation fails. For example:

- When creating a new record whose initial values do not match the collection's schema;
- When there are no records found for a strict query.

## `RelationError`

- `code` `<RelationErrorCode>`, the error code describing the relation operation;
- `info` `<object>`, additional error information:
  - `path` `<PropertyPath>`, path of the relational property;
  - `ownerCollection` `<Collection>`, a reference to the owner collection;
  - `foreignCollection` `<Array<Collection>>`, an array of foreign collections referenced by this relation;
  - `options` `<RelationDefinitionOptions>`, the options object passed when declaring this relation.

Thrown whenever performing a relation operation fails. For example:

- When attempting to reference a foreign record that's already associated with another record in a [unique relation](/ecosystem/data/relations/unique);
- When directly assigning a value to a relational property.
