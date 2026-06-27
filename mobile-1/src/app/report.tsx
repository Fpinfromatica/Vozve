import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { fetchReportData } from '../services/reportService'; // Assuming a service to fetch report data

const ReportScreen = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadReportData = async () => {
      try {
        const data = await fetchReportData();
        setReportData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadReportData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando reportes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reportes</Text>
      {/* Render report data here, e.g., charts or tables */}
      {reportData && reportData.map((report, index) => (
        <View key={index} style={styles.reportItem}>
          <Text style={styles.reportText}>{report.title}</Text>
          <Text style={styles.reportText}>{report.description}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  reportItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  reportText: {
    fontSize: 16,
  },
});

export default ReportScreen;