import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import EbookCard from "../components/EbookCard";
import { getCourses } from "../utils/Authentication";
import { useNavigation } from "@react-navigation/native";

export default function EnrolledPage() {

  const [course, setCourse] = useState(true);
  const [ebook, setEbook] = useState(false);
  const [data, setData] = useState(null);
  const [library, setLibrary] = useState(false);
  const [enrolled, setEnrolled] = useState(true);
  const navigation = useNavigation()

  useEffect(() => {
    const getData = async () => {
      const response = await getCourses("rosekamallove");
      setData(response);
    };
    getData();
  }, []);

  const ChangeCourse = () => {
    setCourse(true);
    setEbook(false);
  };

  const ChangeEbook = () => {
    setCourse(false);
    setEbook(true);
  };

  const ChangeEnrolled = () => {
    navigation.navigate("Library"); 
    setEnrolled(false);
    setLibrary(true); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Pressable
          onPress={ChangeEnrolled}
          style={[
            styles.headerButton,
            library ? { borderColor: "#fd872e" } : { borderColor: "#000000" },
          ]}
        >
          <Text
            style={[
              styles.headerText,
              library ? { color: "#fd872e" } : { color: "black" },
            ]}
          >
            Library
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.headerButton,
            enrolled ? { borderColor: "#fd872e" } : { borderColor: "#000000" },
          ]}
        >
          <Text
            style={[
              styles.headerText,
              enrolled
                ? { color: "#fd872e" }
                : { color: "black" },
            ]}
          >
            Enrolled
          </Text>
        </Pressable>
      </View>
      <View style={styles.sectionContainer}>
        <Pressable
          onPress={ChangeCourse}
          style={[
            styles.courseButton,
            course
              ? { backgroundColor: "#fd872e" }
              : { backgroundColor: "#ffffff" },
          ]}
        >
          <Text
            style={[
              styles.text,
              course ? { color: "white" } : { color: "black" },
            ]}
          >
            Course
          </Text>
        </Pressable>
        <Pressable
          onPress={ChangeEbook}
          style={[
            styles.ebookButton,
            ebook
              ? { backgroundColor: "#fd872e" }
              : { backgroundColor: "#ffffff" },
          ]}
        >
          <Text
            style={[
              styles.text,
              ebook ? { color: "white" } : { color: "black" },
            ]}
          >
            Ebooks
          </Text>
        </Pressable>
      </View>

      {ebook && (
        <ScrollView>
          {[...Array(8).keys()].map((_, index) => (
            <View key={index} style={{ marginTop: 20 }}>
              <EbookCard key={index} />
            </View>
          ))}
        </ScrollView>
      )}
      {course && data && (
        <ScrollView>
          {data.map((e, index) => (
            <View key={index} style={{ marginTop: 20 }}>

                <CourseCard key={index} {...e} />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerButton: {
    borderBottomWidth: 3,
    flex: 1,
    marginHorizontal: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "500",
    paddingHorizontal: 15,
    textAlign: "center",
    paddingBottom: 8,
  },
  sectionContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  courseButton: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 25,
  },
  ebookButton: {
    flex: 1,
    backgroundColor: "#fd872e",
    marginHorizontal: 8,
    borderRadius: 25,
  },
  text: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    paddingVertical: 5,
  },
});
