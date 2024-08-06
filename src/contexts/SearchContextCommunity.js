import React, { createContext, useState } from "react";

export const SearchContextCommunity = createContext();

export const SearchProviderCommunity = ({ children }) => {
	const [isSearching, setIsSearching] = useState(false);
	const [searchText, setSearchText] = useState("");

	return (
		<SearchContextCommunity.Provider
			value={{ isSearching, setIsSearching, searchText, setSearchText }}
		>
			{children}
		</SearchContextCommunity.Provider>
	);
};
