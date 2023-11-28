# Mongoose helper lib

Model related customization on queries. Exposes general purpose functions and a modelQueries object containing all query helpers for the configured models.

## General Purpose Utils

| method        | what it does                                                                                    |
| ------------- | ----------------------------------------------------------------------------------------------- |
| getDocumentId | Returns the id of the element regardless of it was populated or not avoiding cases of confusion |

## Population

Population for use with a .populate() query method to avoid re-writing the same population queries

## Select

Select for use with a .select() query method to avoid re-writing the same select queries. This is useful for removing sensitive information before returning the actual data
