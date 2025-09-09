import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../services/api';

const fetchUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

const Users = () => {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  return (
    <>
      <Helmet>
        <title>Users - React Boilerplate</title>
        <meta name="description" content="View list of users" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl font-bold text-gray-900">Users</h1>
              <Link
                to="/"
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back to Home
              </Link>
            </div>
            
            {isLoading && (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            )}
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                Error loading users: {error.message}
              </div>
            )}
            
            {users && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold text-lg text-gray-900">{user.name}</h3>
                    <p className="text-gray-600 text-sm">{user.email}</p>
                    <p className="text-gray-500 text-sm mt-2">
                      {user.company?.name || 'No company'}
                    </p>
                    <div className="mt-3 text-xs text-gray-400">
                      <p>{user.address?.city}, {user.address?.zipcode}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {users && users.length === 0 && (
              <p className="text-center text-gray-500 py-8">No users found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;