import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, TextInput, TouchableOpacity, View } from 'react-native'
import { Stack, useGlobalSearchParams, useRouter, useSearchParams } from 'expo-router'
import { Text, SafeAreaView } from 'react-native'


import { ScreenHeaderBtn, NearbyJobCard } from '../../components'
import { COLORS, icons, SIZES } from '../../constants'
import styles from '../../styles/search'
import FilterModal from '../../components/search/FilterModal'

const EventSearch = () => {
    const params = useGlobalSearchParams();
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState("");

    const [searchResult, setSearchResult] = useState([]);
    const [searchLoader, setSearchLoader] = useState(false);
    const [searchError, setSearchError] = useState(null);
    const [page, setPage] = useState(1);

    const [filterModalVisible, setFilterModalVisible] = useState(false);


    const handleSearch = async () => {
        setSearchLoader(true);
        setSearchResult([])
    };

    const handlePagination = (direction) => {
        if (direction === 'left' && page > 1) {
            setPage(page - 1)
            handleSearch()
        } else if (direction === 'right') {
            setPage(page + 1)
            handleSearch()
        }
    }

    useEffect(() => {
        setSearchTerm(params.id)
        handleSearch()
    }, [])

    const handleApplyFilters = (filters) => {
        // Appliquer les filtres à votre liste de recherche
        console.log('Filters applied:', filters);
    };

    const handleResetFilters = () => {
        // Réinitialiser les filtres
        console.log('Filters reset');
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <View
                style={{
                    flex: 1,
                    padding: SIZES.medium,
                }}
            >

                <Stack.Screen
                    options={{
                        headerStyle: { backgroundColor: COLORS.lightWhite },
                        headerShadowVisible: false,
                        headerLeft: () => (
                            <ScreenHeaderBtn
                                iconUrl={icons.left}
                                dimension='60%'
                                handlePress={() => router.back()}
                            />
                        ),
                        headerRight: () => (
                            <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' handlePress={() => setFilterModalVisible(true)} />
                          ),
                        headerTitle: "",
                    }}
                />

                <FilterModal
                visible={filterModalVisible}
                onClose={() => setFilterModalVisible(false)}
                onApply={handleApplyFilters}
                onReset={handleResetFilters}
            />

                <View style={styles.searchContainer}>
                    <View style={styles.searchWrapper}>
                        <TextInput
                            style={styles.searchInput}
                            value={searchTerm}
                            onChangeText={(text) => setSearchTerm(text)}
                            placeholder='Que recherchez vous ?'
                        />
                    </View>

                    <TouchableOpacity style={styles.searchBtn} onPress={() => { }}>
                        <Image
                            source={icons.search}
                            resizeMode='contain'
                            style={styles.searchBtnImage}
                        />
                    </TouchableOpacity>
                </View>

                {/* <Text>Resultats pour : {searchTerm} </Text> */}


                {/* <FlatList
                data={searchResult}
                renderItem={({ item }) => (
                    <NearbyJobCard
                        job={item}
                        handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
                    />
                )}
                keyExtractor={(item) => item.job_id}
                contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
                ListHeaderComponent={() => (
                    <>
                        <View style={styles.container}>
                            <Text style={styles.searchTitle}>{params.id}</Text>
                            <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
                        </View>
                        <View style={styles.loaderContainer}>
                            {searchLoader ? (
                                <ActivityIndicator size='large' color={COLORS.primary} />
                            ) : searchError && (
                                <Text>Oops something went wrong</Text>
                            )}
                        </View>
                    </>
                )}

                ListFooterComponent={() => (
                    <View style={styles.footerContainer}>
                        <TouchableOpacity
                            style={styles.paginationButton}
                            onPress={() => handlePagination('left')}
                        >
                            <Image
                                source={icons.chevronLeft}
                                style={styles.paginationImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <View style={styles.paginationTextBox}>
                            <Text style={styles.paginationText}>{page}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.paginationButton}
                            onPress={() => handlePagination('right')}
                        >
                            <Image
                                source={icons.chevronRight}
                                style={styles.paginationImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                )}
            /> */}
            </View>
        </SafeAreaView>
    )
}

export default EventSearch