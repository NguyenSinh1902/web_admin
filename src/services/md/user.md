// Cập nhật dịch vụ cho user role STAFF
curl -X PUT http://localhost:5000/api/users/staff/68048f8f48d8920ada4434a8/update-services \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "serviceGroups": [
      "6803b155108129c61256fa2a",
      "6803b1fd108129c61256fa2b"
    ]
  }'
