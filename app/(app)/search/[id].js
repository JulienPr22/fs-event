import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, RefreshControl, ScrollView, TextInput, TouchableOpacity, View } from 'react-native'
import { Stack, useGlobalSearchParams, useRouter, useSearchParams } from 'expo-router'
import { Text, SafeAreaView } from 'react-native'


import { ScreenHeaderBtn, NearbyJobCard, PopularEventCard } from '../../components'
import { COLORS, icons, SIZES } from '../../constants'
import styles from '../../styles/search'
import FilterModal from '../../components/search/FilterModal'
import firestoreService from '../services/fireStoreService'
import { Avatar, Badge } from '@rneui/themed'

const EventSearch = () => {
    const params = useGlobalSearchParams();
    const router = useRouter()

    const [searchResult, setSearchResult] = useState([]);
    const [searchLoader, setSearchLoader] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [searchError, setSearchError] = useState(null);
    const [page, setPage] = useState(1);

    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [animationTypeFilter, setAnimationTypeFilter] = useState([]);


    const animationTypes = [
        'Atelier',
        'Conférence',
        'Exposition',
        'Festival',
        'Jeu',
        'Spectacle',
        'Visite',
        'Parcours scientifique',
        'Rencontre / débat',
        'Village des Sciences',
    ];

    const [checkedItems, setCheckedItems] = useState(
        animationTypes.map((type) => ({ label: type, checked: false }))
    );


    const handleSearch = async () => {
        setSearchLoader(true);
        setSearchResult([])

        try {
            const events = await firestoreService.fetchEvents({ limit: 20, minRating: 4.500, animationTypeFilter: animationTypeFilter }, setSearchLoader);
            console.log('events', events);
            setSearchResult(events);
        } catch (error) {
            console.log(error);
        } finally {
            setSearchLoader(false);
        }

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

    const handleApplyFilters = () => {
        setAnimationTypeFilter(checkedItems.filter(item => item.checked).map(item => item.label))

    };

    const handleOnClose = async () => {
        await handleRefresh()
        setFilterModalVisible(false)
    };

    const handleRefresh = async () => {
        setRefreshing(true); // Activer le rafraîchissement
        try {
            await handleSearch(); // Effectuer une nouvelle recherche
        } catch (error) {
            console.log(error);
        } finally {
            setRefreshing(false); // Désactiver le rafraîchissement une fois terminé
        }
    };

    useEffect(() => {
        handleSearch()
    }, [])





    const handleResetFilters = () => {
        // Réinitialiser les filtres
        console.log('Filters reset');
        // setAnimationTypeFilter(checkedItems.map(item => { item.label, false }));

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
                            <TouchableOpacity style={styles.btnContainer} onPress={() => setFilterModalVisible(true)}>

                                <Image
                                    source={icons.filter}
                                    resizeMode='cover'
                                    style={styles.btnImg('60%')}
                                />
                                {animationTypeFilter.length > 0 && (<Badge
                                    status="primary"
                                    containerStyle={{ position: 'absolute', top: 5, left: 40 }}
                                />)}

                            </TouchableOpacity>


                            //<ScreenHeaderBtn iconUrl={icons.filter} dimension='60%' handlePress={() => setFilterModalVisible(true)} />
                        ),
                        headerTitle: "",
                    }}
                />

                <View style={styles.searchContainer}>
                    <View style={styles.searchWrapper}>
                        <TextInput
                            style={styles.searchInput}
                            value={""}

                            placeholder='Que recherchez vous ?'
                        />
                    </View>

                    <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
                        <Image
                            source={icons.search}
                            resizeMode='contain'
                            style={styles.searchBtnImage}
                        />
                    </TouchableOpacity>
                </View>

                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                    }
                    data={searchResult}
                    renderItem={({ item }) => (
                        <PopularEventCard
                            key={item?.id}
                            event={item}
                            onPress={() => router.push(`/event-details/${item?.id}`)}
                        />
                    )}
                    keyExtractor={(item) => item.job_id}
                    contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
                    ListHeaderComponent={() => (
                        <>
                            <View style={styles.container}>
                                <Text style={styles.searchTitle}>Résultats: </Text>
                                {/* <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text> */}
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
                />

            </View>

            <FilterModal
                visible={filterModalVisible}
                onClose={handleOnClose}
                onApply={handleApplyFilters}
                onReset={handleResetFilters}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
            />

        </SafeAreaView>
    )
}

export default EventSearch