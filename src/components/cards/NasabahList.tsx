import { useDropBaru } from "@/src/lib/hooks/drop/useDropBaru";
import { useDropLama } from "@/src/lib/hooks/drop/useDropLama";
import { DropBaru } from "@/src/lib/services/crud/drop-baru/types";
import { DropLama } from "@/src/lib/services/crud/drop-lama/types";
import { commonStyles } from "@/src/lib/styles/common";
import { theme } from "@/src/lib/styles/theme";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import EmptyState from "../shared/EmptyState";
import ErrorState from "../shared/ErrorState";
import NasabahCard, { NasabahData } from "./NasabahCard";

export default function NasabahList() {
  const [activeTab, setActiveTab] = useState<"semua" | "baru" | "lama">(
    "semua"
  );

  const {
    data: dropBaruData,
    loading: loadingBaru,
    error: errorBaru,
    refreshing: refreshingBaru,
    refresh: refreshDropBaru,
  } = useDropBaru();
  const {
    data: dropLamaData,
    loading: loadingLama,
    error: errorLama,
    refreshing: refreshingLama,
    refresh: refreshDropLama,
  } = useDropLama();

  const handleRefresh = React.useCallback(() => {
    // Refresh kedua tipe data
    refreshDropBaru();
    refreshDropLama();
  }, [refreshDropBaru, refreshDropLama]);

  // // Auto-refresh saat screen di-focus (misalnya setelah kembali dari form)
  // useFocusEffect(
  //   React.useCallback(() => {
  //     // Delay sedikit untuk memastikan animasi navigasi selesai
  //     const timeoutId = setTimeout(() => {
  //       handleRefresh();
  //     }, 300);

  //     return () => clearTimeout(timeoutId);
  //   }, [handleRefresh])
  // );

  const handleItemPress = (item: NasabahData) => {
    // Handler untuk ketika item di-tap
    console.log("Selected nasabah:", item.nama);
    const isBaru = "saldo_pinjaman" in item;
    router.push({
      pathname: "/PembayaranScreen",
      params: {
        id: item.id || "",
        type: isBaru ? "baru" : "lama",
        nama: item.nama,
        alamat: item.alamat,
        angsuran: String(item.angsuran),
        tabungan: String(item.tabungan),
        saldo: String(
          isBaru
            ? (item as DropBaru).saldo_pinjaman
            : (item as DropLama).sisa_saldo
        ),
        pinjaman: String(
          isBaru
            ? (item as DropBaru).saldo_pinjaman
            : (item as DropLama).sisa_saldo
        ),
      },
    });
  };

  const renderTabButton = (tab: "semua" | "baru" | "lama", label: string) => (
    <TouchableOpacity
      style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
      onPress={() => setActiveTab(tab)}
      activeOpacity={0.7}
    >
      <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({
    item,
    type,
  }: {
    item: NasabahData;
    type: "baru" | "lama";
  }) => <NasabahCard item={item} type={type} onPress={handleItemPress} />;

  const renderEmptyState = () => (
    <EmptyState
      title="Belum Ada Data Nasabah"
      subtitle="Tambahkan nasabah baru untuk mulai mengelola data pinjaman"
      icon="👥"
      actionText="Tambah Nasabah"
      onActionPress={() => {
        // TODO: Navigate to add nasabah screen
        router.push("/(tabs)/TabTambah");
      }}
    />
  );

  const renderErrorState = (error: any) => (
    <ErrorState
      title="Gagal Memuat Data"
      subtitle="Terjadi kesalahan saat mengambil data nasabah"
      error={error}
      onRetry={() => {
        // TODO: Implement retry logic
        console.log("Retry fetch data");
      }}
      showErrorDetails={__DEV__} // Only show error details in development
    />
  );

  const renderDropBaruList = () => {
    if (loadingBaru) {
      return (
        <View style={commonStyles.centeredContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Memuat data nasabah...</Text>
        </View>
      );
    }

    if (errorBaru) {
      return renderErrorState(errorBaru);
    }

    return (
      <FlatList
        data={dropBaruData}
        renderItem={({ item }) => renderItem({ item, type: "baru" })}
        keyExtractor={(item: DropBaru) =>
          item.id || `${item.nama}-${Date.now()}`
        }
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshingBaru}
            onRefresh={refreshDropBaru}
            colors={[theme.colors.primary]}
          />
        }
        ListEmptyComponent={renderEmptyState}
      />
    );
  };

  const renderDropLamaList = () => {
    if (loadingLama) {
      return (
        <View style={commonStyles.centeredContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Memuat data nasabah...</Text>
        </View>
      );
    }

    if (errorLama) {
      return renderErrorState(errorLama);
    }

    return (
      <FlatList
        data={dropLamaData}
        renderItem={({ item }) => renderItem({ item, type: "lama" })}
        keyExtractor={(item: DropLama) =>
          item.id || `${item.nama}-${Date.now()}`
        }
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshingLama}
            onRefresh={refreshDropLama}
            colors={[theme.colors.primary]}
          />
        }
        ListEmptyComponent={renderEmptyState}
      />
    );
  };

  const renderAllList = () => {
    const isLoading = loadingBaru || loadingLama;
    const isRefreshing = refreshingBaru || refreshingLama;
    const hasError = errorBaru || errorLama;

    if (isLoading) {
      return (
        <View style={commonStyles.centeredContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Memuat data nasabah...</Text>
        </View>
      );
    }

    if (hasError) {
      return renderErrorState(errorBaru || errorLama);
    }

    return (
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={[theme.colors.primary]}
          />
        }
      >
        {/* Section Drop Baru */}
        {dropBaruData && dropBaruData.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionContent}>
              {dropBaruData.map((item: DropBaru) => (
                <NasabahCard
                  key={item.id || `baru-${item.nama}-${Date.now()}`}
                  item={item}
                  type="baru"
                  onPress={handleItemPress}
                />
              ))}
            </View>
          </View>
        )}

        {/* Section Drop Lama */}
        {dropLamaData && dropLamaData.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionContent}>
              {dropLamaData.map((item: DropLama) => (
                <NasabahCard
                  key={item.id || `lama-${item.nama}-${Date.now()}`}
                  item={item}
                  type="lama"
                  onPress={handleItemPress}
                />
              ))}
            </View>
          </View>
        )}

        {/* Jika tidak ada data sama sekali */}
        {(!dropBaruData || dropBaruData.length === 0) &&
          (!dropLamaData || dropLamaData.length === 0) &&
          renderEmptyState()}
      </ScrollView>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "baru":
        return renderDropBaruList();
      case "lama":
        return renderDropLamaList();
      case "semua":
      default:
        return renderAllList();
    }
  };

  return (
    <View style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {renderTabButton("semua", "Semua")}
        {renderTabButton("baru", "Drop Baru")}
        {renderTabButton("lama", "Drop Lama")}
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>{renderContent()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Tab Styles
  tabContainer: {
    flexDirection: "row",
    backgroundColor: theme.colors.white,
    marginHorizontal: theme.spacing.md,
    marginTop: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xs,
    ...theme.shadows.sm,
  },

  tabButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
  },

  activeTabButton: {
    backgroundColor: theme.colors.primary,
    ...theme.shadows.sm,
  },

  tabText: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.gray[500],
  },

  activeTabText: {
    color: theme.colors.white,
    fontWeight: theme.typography.weights.semibold,
  },

  // Content Styles
  contentContainer: {
    flex: 1,
    marginTop: theme.spacing.sm,
  },

  listContainer: {
    padding: theme.spacing.sm,
    paddingBottom: theme.spacing.lg,
  },

  scrollContainer: {
    flex: 1,
    padding: theme.spacing.xs,
  },

  section: {
    marginBottom: theme.spacing.md,
  },

  sectionTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.gray[500],
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.xs,
    marginTop: theme.spacing.xs,
  },

  sectionContent: {
    marginHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    overflow: "hidden",
  },

  loadingText: {
    marginTop: theme.spacing.md,
    fontSize: theme.typography.sizes.base,
    color: theme.colors.gray[400],
    textAlign: "center",
  },
});
