import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../features/auth/LoginPage';
import { RegisterPage } from '../features/auth/RegisterPage';
import { MainLayout } from '../components/layout/MainLayout';
import { ProtectedRoute } from '../components/layout/ProtectedRoute';
import { DashboardPage } from '../features/dashboard/DashboardPage';
import { DormitoryList } from '../features/dormitories/DormitoryList';
import { DormitoryDetails } from '../features/dormitories/DormitoryDetails';
import { StudentList } from '../features/students/StudentList';
import { ResidentList } from '../features/residents/ResidentList';
import { WorkerList } from '../features/workers/WorkerList';
import { SearchPage } from '../features/search/SearchPage';
import { OccupancyReport } from '../features/reports/OccupancyReport';

export const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/dormitories" element={<DormitoryList />} />
                <Route path="/dormitories/:id" element={<DormitoryDetails />} />
                <Route path="/students" element={<StudentList />} />
                <Route path="/residents" element={<ResidentList />} />
                <Route path="/workers" element={<WorkerList />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/reports/occupancy" element={<OccupancyReport />} />
            </Route>

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
};
