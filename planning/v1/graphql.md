### Stage1

## Types

1. Request
2. Certificate
3. User
4. Sign

## Queries

getUserByID
getUserByMailID

## Mutations

createUser
updateUser

### Stage2

## Queries

getSignsByUserID
getSignByID

## Mutations

addSign

### Stage3

## Queries

getRequestByID
getRequestByUserID(isApprover: Boolean, isInitiator: Boolean)
// TODO: Pagination Query
getRequestBySearch

## Mutations

createRequest
updateRequestStatus

### Stage4

## Queries

getCertificateByID
getCertificateByMailID
getCertificateByRequestID

## Mutations

createCertificate
// Check mongoose to implement transactions
// Cannot give all the certificates in response
