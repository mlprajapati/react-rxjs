import React from "react";
import { messageService } from "./services/common";
import {
  loadProducts,
  getAllProducts,
  getExpiredProducts,
  getProductsExpiringSoon
} from "./services/Product";
import SimplePagination from "./components/SimplePagination";
import ProductItems from "./components/ProductItems";
import FilterProduct from "./components/FilterProduct";
let itemList;
let allItems;
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: "",
      filterBy: "all",
      currentPageNumber: 1,
      totalPages: 1,
      numItemsPerPage: 8,
      totalItems: [],
      currentItemTitle: "",
      currentPageItems: [],
      batteryStatus: {}
    };
  }
  resize = () => {
    let width = window.innerWidth;
    console.log("width  ---- ", width);
    if (width < 1024) {
      this.setState({ numItemsPerPage: 8 });
    } else if (width >= 1024 && width < 1166) {
      this.setState({ numItemsPerPage: 9 });
    } else {
      this.setState({ numItemsPerPage: 8 });
    }
    this.initData(this.state.currentPageNumber);
  };

  itemClick = item => {
    console.log("item---- ", item);
    this.setState({ currentItemTitle: item.title });
    // if (this.state.filterBy === "all") {
    //     this.props.history.push("/item-details", { item });
    // }
  };

  paginate = (array, page_size, page_number) => {
    --page_number;
    console.log(array, page_size, page_number);
    return array.slice(page_number * page_size, (page_number + 1) * page_size);
  };

  initData = async currentPageNumber => {
    let listItem = itemList;
    this.setState({ currentPageNumber: currentPageNumber });
    this.setState({
      totalItems: listItem
    });
    let totalPages = Math.ceil(listItem.length / this.state.numItemsPerPage);
    this.setState({ totalPages: totalPages });
    await this.setState({
      currentPageItems: this.paginate(
        listItem,
        this.state.numItemsPerPage,
        currentPageNumber
      )
    });
    this.setState({ currentItemTitle: "" });
  };
  onSelectPagination = number => {
    console.log("..................... ", number);
    if (number > 0 && number <= this.state.totalPages) {
      this.setState({ currentPageNumber: number });
      this.setState({
        currentPageItems: this.paginate(
          this.state.totalItems,
          this.state.numItemsPerPage,
          number
        )
      });
    } else {
      this.setState({ currentPageNumber: this.state.currentPageNumber });
    }
  };

  componentDidMount = () => {
    // subscribe to home component messages
    this.subscription = messageService.getMessage().subscribe(message => {
      if (message) {
        // add message to local state if not empty
        this.setState({ messages: message });
        if (message.text === "expired") {
          itemList = getExpiredProducts(allItems.data.children);
        } else if (message.text === "expiring") {
          itemList = getProductsExpiringSoon(allItems.data.children, 200);
        } else {
          itemList = getAllProducts(allItems.data.children);
        }
        this.initData(1);
      } else {
        // clear messages when empty message received
        this.setState({ messages: "" });
      }
    });
    loadProducts()
      .then(response => {
        console.log("Product List ", response);
        allItems = response;
        itemList = getAllProducts(response.data.children);

        this.initData(1);
        this.resize();
      })
      .catch(error => {
        console.log("Product Failed", error);
      });

    window.addEventListener("resize", this.resize);
  };

  componentWillUnmount() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
    window.removeEventListener("resize", this.resize);
  }

  render() {
    return (
      <div>
        <FilterProduct />
        <SimplePagination
          style={{
            backgroundColor: "#e0e0e0",
            padding: "10px 15px",
            marginBottom: 0
          }}
          onSelectPagination={this.onSelectPagination}
          currentPageNumber={this.state.currentPageNumber}
          items={this.state.totalPages}
          title={this.state.currentItemTitle}
          totalPages={this.state.totalPages}
        />
        <ProductItems
          itemList={this.state.currentPageItems}
          itemClick={this.itemClick}
        />
      </div>
    );
  }
}

export default HomePage;
