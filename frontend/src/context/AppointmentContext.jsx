import { createContext, useState, useCallback } from "react";
import { appointmentService } from "../services/appointmentService";

export const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAppointments = useCallback(async (filters = {}) => {
        setLoading(true);
        setError(null);
        try {
            const data = await appointmentService.getAllAppointments(filters);
            setAppointments(data);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const createAppointment = useCallback(async (appointmentData) => {
        setLoading(true);
        setError(null);
        try {
            const newAppointment = await appointmentService.createAppointment(appointmentData);
            setAppointments([...appointments, newAppointment]);
            return newAppointment;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [appointments]);

    const updateAppointment = useCallback(async (appointmentId, updates) => {
        setLoading(true);
        setError(null);
        try {
            const updated = await appointmentService.updateAppointment(appointmentId, updates);
            setAppointments(appointments.map(a => a.id === appointmentId ? updated : a));
            return updated;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [appointments]);

    const cancelAppointment = useCallback(async (appointmentId) => {
        return updateAppointment(appointmentId, { status: "cancelled" });
    }, [updateAppointment]);

    const value = {
        appointments,
        loading,
        error,
        fetchAppointments,
        createAppointment,
        updateAppointment,
        cancelAppointment,
    };

    return (
        <AppointmentContext.Provider value={value}>
            {children}
        </AppointmentContext.Provider>
    );
};
