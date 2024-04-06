import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, Image, RefreshControl, TextInput, TouchableOpacity, View } from 'react-native'
import { Stack, useGlobalSearchParams, useRouter } from 'expo-router'
import { Text, SafeAreaView } from 'react-native'
import { ScreenHeaderBtn, EventCard } from '../../components'
import { COLORS, icons, SIZES } from '../../constants'
import styles from '../../styles/search'
import FilterModal from '../../components/search/FilterModal'
import { Badge } from '@rneui/themed'
import eventService from '../services/eventService'

const EventSearch = () => {
    const params = useGlobalSearchParams();
    const router = useRouter()

    const [searchResult, setSearchResult] = useState([]);
    const [displayedResult, setDisplayedResult] = useState([]);

    const [searchLoader, setSearchLoader] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [searchError, setSearchError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [maxReachedPage, setMaxReachedPage] = useState(1);

    const [lastEventVisible, setLastEventVisible] = useState(null)

    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [animationTypeFilter, setAnimationTypeFilter] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [minRating, setMinRating] = useState("1")
    const flatListRef = useRef(null);

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

    const fetchEvents = async (keyword) => {
        const { newLastVisible, items } = await eventService.fetchEvents(
            {
                maxResults: 20,
                searchTerm: keyword,
                minRating: parseInt(minRating),
                animationTypeFilter: animationTypeFilter,
                lastVisible: lastEventVisible,
                page: currentPage
            },
            setSearchLoader);

        return { newLastVisible, items };
    }


    useEffect(() => {
        (async () => {
            if (params.id !== "all") {
                 setSearchTerm(params.id)
            }

            const { items, newLastVisible } = await fetchEvents(params.id);
            setSearchResult(items);
            setDisplayedResult(items)
            setLastEventVisible(newLastVisible);

        })();
    }, [])

    // Nouvelle recherche, on vide le tableau de résultat et on remet la page à 1
    const handleNewSearch = async () => {
        console.log("lastEventVisible", lastEventVisible);
        const { items, newLastVisible } = await fetchEvents(searchTerm);
        setSearchResult(items);
        setDisplayedResult(items);

        setCurrentPage(1)
        setMaxReachedPage(1)
        setLastEventVisible(newLastVisible)
        flatListRef.current.scrollToOffset({ offset: 0, animated: true });

    }

    // Recherche des événement d'une nouvelle page
    const handleSearch = async () => {
        try {
            const { items, newLastVisible } = await fetchEvents(searchTerm);
            setSearchResult(prevEvents => [...prevEvents, ...items]);
            setDisplayedResult(items);
            setLastEventVisible(newLastVisible)
            setMaxReachedPage(maxReachedPage + 1)
            flatListRef.current.scrollToOffset({ offset: 0, animated: true });

        } catch (error) {
            console.log(error);
        }
    };

    const handlePagination = async (direction) => {
        let nextPage = currentPage;

        if (direction === 'left' && currentPage > 1) {
            nextPage = currentPage - 1;

            // On affiche les résultats de la page précedente
                const start = (nextPage -1) * 20
                const end = start + 19
                const resultTodisplay = searchResult.slice(start, end)
                setDisplayedResult(resultTodisplay)

        } else if (direction === 'right') {
            nextPage = currentPage + 1;

            // si on a déjà charger cette page, on  affiche directement le contenu stocké
            if (nextPage <= maxReachedPage) {
                console.log("page already reached")
                const start = (nextPage -1) * 20
                const end = start + 19
                const resultTodisplay = searchResult.slice(start, end)
                setDisplayedResult(resultTodisplay)
            } else {
                console.log("new page to load", searchTerm)
                console.log(lastEventVisible.data());
                await handleSearch()

            }
        }
        setCurrentPage(nextPage);
        flatListRef.current.scrollToOffset({ offset: 0, animated: true });

    }

    const handleApplyFilters = () => {
        setAnimationTypeFilter(checkedItems.filter(item => item.checked).map(item => item.label))
    };

    const handleOnClose = async () => {
        await handleRefresh()
        setFilterModalVisible(false)
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        try {
            await handleNewSearch();
        } catch (error) {
            console.log(error);
        } finally {
            setRefreshing(false);
        }
    };

    const handleResetFilters = () => {
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

                        ),
                        headerTitle: "",
                    }}
                />

                <View style={styles.searchContainer}>
                    <View style={styles.searchWrapper}>
                        <TextInput
                            style={styles.searchInput}
                            value={searchTerm}
                            onChangeText={(text) => setSearchTerm(text)}
                            placeholder='Saisissez un mot clé'
                            returnKeyType='search'
                            onSubmitEditing={handleNewSearch}
                        />
                    </View>

                    <TouchableOpacity style={styles.searchBtn} onPress={handleNewSearch}>
                        <Image
                            source={icons.search}
                            resizeMode='contain'
                            style={styles.searchBtnImage}
                        />
                    </TouchableOpacity>
                </View>

                <FlatList
                    ref={flatListRef}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                    }
                    data={displayedResult}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <EventCard
                            key={index}
                            event={item}
                            onPress={() => router.push(`/event-details/${item?.id}`)}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
                    ListHeaderComponent={() => (
                        <>
                            <View style={styles.container}>
                                <Text style={styles.searchTitle}>Résultats: </Text>
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
                                disabled={currentPage == 1}
                            >
                                <Image
                                    source={icons.chevronLeft}
                                    style={styles.paginationImage}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                            <View style={styles.paginationTextBox}>
                                <Text style={styles.paginationText}>{currentPage}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.paginationButton}
                                onPress={() => handlePagination('right')}
                                disabled={searchResult.length < 20}

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
                minimumRating={minRating}
                setMinimumRating={setMinRating}
            />

        </SafeAreaView>
    )
}

export default EventSearch