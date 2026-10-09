// Striver's 180 - Master DSA Patterns
// Scraped & compiled from https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns

export interface StriverQuestion {
  id: number;
  label: string;
  slug: string;
  topic: string;
  pattern: string;
  duration: string | null;
  difficulty: 'core' | 'optional' | string;
  yt_video: string | null;
  leetcode_link: string | null;
  article_link: string | null;
  tuf_practice_link: string;
  topic_tags: { id: string; name: string; slug: string }[];
  pattern_tags: { id: string; name: string; slug: string }[];
}

export interface StriverSubtopic {
  id: number;
  label: string;
  slug: string;
  questions: StriverQuestion[];
}

export interface StriverTopic {
  id: number;
  label: string;
  slug: string;
  subtopics: StriverSubtopic[];
}


export const STRIVER_180_TOPICS: StriverTopic[] = [
  {
    "id": 2217,
    "label": "Arrays",
    "slug": "arrays",
    "subtopics": [
      {
        "id": 2218,
        "label": "Linear Scan",
        "slug": "linear-scan",
        "questions": [
          {
            "id": 22,
            "label": "Majority Element-I",
            "slug": "majority-element-i",
            "duration": "17 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/nP_ns3uSh80",
            "leetcode_link": "https://leetcode.com/problems/majority-element/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/majority-element-n-by-2",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2217#majority-element-i",
            "topic_tags": [
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "184",
                "name": "Basic Traversal / Scan",
                "slug": "basic-traversal-scan"
              }
            ],
            "topic": "Arrays",
            "pattern": "Linear Scan"
          },
          {
            "id": 29,
            "label": "Kadane's Algorithm",
            "slug": "kadane's-algorithm",
            "duration": "19 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/AHZpyENo7k4",
            "leetcode_link": "https://leetcode.com/problems/maximum-subarray/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2217#kadane's-algorithm",
            "topic_tags": [
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "184",
                "name": "Basic Traversal / Scan",
                "slug": "basic-traversal-scan"
              }
            ],
            "topic": "Arrays",
            "pattern": "Linear Scan"
          },
          {
            "id": 23,
            "label": "Majority Element-II",
            "slug": "majority-element-ii",
            "duration": "25 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/vwZj1K0e9U8",
            "leetcode_link": "https://leetcode.com/problems/majority-element-ii/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/majority-element-ii-n-by-3",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2217#majority-element-ii",
            "topic_tags": [
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              },
              {
                "id": "233",
                "name": "Hashing",
                "slug": "hashing"
              }
            ],
            "pattern_tags": [
              {
                "id": "186",
                "name": "Frequency Counting",
                "slug": "frequency-counting"
              }
            ],
            "topic": "Arrays",
            "pattern": "Linear Scan"
          },
          {
            "id": 24,
            "label": "Maximum Product Subarray in an Array",
            "slug": "maximum-product-subarray-in-an-array",
            "duration": "18 min",
            "difficulty": "core",
            "yt_video": null,
            "leetcode_link": "https://leetcode.com/problems/maximum-product-subarray/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/maximum-product-subarray",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2217#maximum-product-subarray-in-an-array",
            "topic_tags": [
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "184",
                "name": "Basic Traversal / Scan",
                "slug": "basic-traversal-scan"
              }
            ],
            "topic": "Arrays",
            "pattern": "Linear Scan"
          }
        ]
      },
      {
        "id": 2219,
        "label": "Two Pointers",
        "slug": "two-pointers",
        "questions": [
          {
            "id": 36,
            "label": "Sort an array of 0's 1's and 2's",
            "slug": "sort-an-array-of-0's-1's-and-2's",
            "duration": "24 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/tp8JIuCXBaU",
            "leetcode_link": "https://leetcode.com/problems/sort-colors/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/sort-array-0s-1s-2s",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2217#sort-an-array-of-0's-1's-and-2's",
            "topic_tags": [
              {
                "id": "234",
                "name": "Sorting",
                "slug": "sorting"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "190",
                "name": "Sort and Scan",
                "slug": "sort-and-scan"
              }
            ],
            "topic": "Arrays",
            "pattern": "Two Pointers"
          },
          {
            "id": 27,
            "label": "3 Sum",
            "slug": "3-sum",
            "duration": "37 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/DhFh8Kw7ymk",
            "leetcode_link": "https://leetcode.com/problems/3sum/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/3sum",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2217#3-sum",
            "topic_tags": [
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "188",
                "name": "Two Pointer",
                "slug": "two-pointer"
              },
              {
                "id": "190",
                "name": "Sort and Scan",
                "slug": "sort-and-scan"
              }
            ],
            "topic": "Arrays",
            "pattern": "Two Pointers"
          },
          {
            "id": 31,
            "label": "Next Permutation",
            "slug": "next-permutation",
            "duration": "26 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/JDOXKqF60RQ",
            "leetcode_link": "https://leetcode.com/problems/next-permutation/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/next-permutation",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2217#next-permutation",
            "topic_tags": [
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "188",
                "name": "Two Pointer",
                "slug": "two-pointer"
              }
            ],
            "topic": "Arrays",
            "pattern": "Two Pointers"
          },
          {
            "id": 28,
            "label": "4 Sum",
            "slug": "4-sum",
            "duration": "27 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/eD95WRfh81c",
            "leetcode_link": "https://leetcode.com/problems/4sum/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/4sum",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2217#4-sum",
            "topic_tags": [
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "188",
                "name": "Two Pointer",
                "slug": "two-pointer"
              },
              {
                "id": "190",
                "name": "Sort and Scan",
                "slug": "sort-and-scan"
              }
            ],
            "topic": "Arrays",
            "pattern": "Two Pointers"
          },
          {
            "id": 25,
            "label": "Merge two sorted arrays without extra space",
            "slug": "merge-two-sorted-arrays-without-extra-space",
            "duration": "32 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/n7uwj04E0I4",
            "leetcode_link": "https://leetcode.com/problems/merge-sorted-array/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2217#merge-two-sorted-arrays-without-extra-space",
            "topic_tags": [
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "188",
                "name": "Two Pointer",
                "slug": "two-pointer"
              },
              {
                "id": "190",
                "name": "Sort and Scan",
                "slug": "sort-and-scan"
              }
            ],
            "topic": "Arrays",
            "pattern": "Two Pointers"
          },
          {
            "id": 965,
            "label": "Trapping Rainwater",
            "slug": "trapping-rainwater",
            "duration": "29 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/1_5VuquLbXg?si=NFG6df318_6OtGvg",
            "leetcode_link": "https://leetcode.com/problems/trapping-rain-water/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/trapping-rain-water",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2217#trapping-rainwater",
            "topic_tags": [
              {
                "id": "241",
                "name": "Stack & Queues",
                "slug": "stack-queues"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "202",
                "name": "Monotonic Stack / Queue",
                "slug": "monotonic-stack-queue"
              }
            ],
            "topic": "Arrays",
            "pattern": "Two Pointers"
          }
        ]
      },
      {
        "id": 2220,
        "label": "Divide and Conquer",
        "slug": "divide-and-conquer",
        "questions": [
          {
            "id": 20,
            "label": "Count Inversions",
            "slug": "count-inversions",
            "duration": "23 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/AseUmwVNaoY",
            "leetcode_link": null,
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/count-inversions-in-an-array-using-merge-sort",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2217#count-inversions",
            "topic_tags": [
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "194",
                "name": "Divide and Conquer",
                "slug": "divide-and-conquer"
              }
            ],
            "topic": "Arrays",
            "pattern": "Divide and Conquer"
          },
          {
            "id": 26,
            "label": "Reverse Pairs",
            "slug": "reverse-pairs",
            "duration": "31 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/0e4bZaP3MDI",
            "leetcode_link": "https://leetcode.com/problems/reverse-pairs/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/count-reverse-pairs",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2217#reverse-pairs",
            "topic_tags": [
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "194",
                "name": "Divide and Conquer",
                "slug": "divide-and-conquer"
              }
            ],
            "topic": "Arrays",
            "pattern": "Divide and Conquer"
          }
        ]
      }
    ]
  },
  {
    "id": 2221,
    "label": "Hashing",
    "slug": "hashing",
    "subtopics": [
      {
        "id": 2222,
        "label": "Hashing & Prefix Sums",
        "slug": "hashing-prefix-sums",
        "questions": [
          {
            "id": 37,
            "label": "Two Sum",
            "slug": "two-sum",
            "duration": "17 min",
            "difficulty": "basic",
            "yt_video": "https://youtu.be/UXDSeD9mN-k",
            "leetcode_link": "https://leetcode.com/problems/two-sum/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/two-sum",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2221#two-sum",
            "topic_tags": [
              {
                "id": "233",
                "name": "Hashing",
                "slug": "hashing"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "184",
                "name": "Basic Traversal / Scan",
                "slug": "basic-traversal-scan"
              }
            ],
            "topic": "Hashing",
            "pattern": "Hashing & Prefix Sums"
          },
          {
            "id": 563,
            "label": "Longest Consecutive Sequence in an Array",
            "slug": "longest-consecutive-sequence-in-an-array",
            "duration": "22 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/oO5uLE7EUlM",
            "leetcode_link": "https://leetcode.com/problems/longest-consecutive-sequence/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/longest-consecutive-sequence-in-an-array",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2221#longest-consecutive-sequence-in-an-array",
            "topic_tags": [
              {
                "id": "233",
                "name": "Hashing",
                "slug": "hashing"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              },
              {
                "id": "246",
                "name": "Graphs",
                "slug": "graphs"
              }
            ],
            "pattern_tags": [
              {
                "id": "184",
                "name": "Basic Traversal / Scan",
                "slug": "basic-traversal-scan"
              }
            ],
            "topic": "Hashing",
            "pattern": "Hashing & Prefix Sums"
          },
          {
            "id": 564,
            "label": "Longest subarray with sum K",
            "slug": "longest-subarray-with-sum-k",
            "duration": "40 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/frf7qxiN2qU",
            "leetcode_link": "https://leetcode.com/problems/maximum-size-subarray-sum-equals-k/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2221#longest-subarray-with-sum-k",
            "topic_tags": [
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              },
              {
                "id": "233",
                "name": "Hashing",
                "slug": "hashing"
              }
            ],
            "pattern_tags": [
              {
                "id": "187",
                "name": "Prefix / Precomputation",
                "slug": "prefix-precomputation"
              }
            ],
            "topic": "Hashing",
            "pattern": "Hashing & Prefix Sums"
          },
          {
            "id": 561,
            "label": "Count subarrays with given sum",
            "slug": "count-subarrays-with-given-sum",
            "duration": "22 min",
            "difficulty": "core",
            "yt_video": "https://www.youtube.com/watch?v=xvNwoz-ufXA&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=32",
            "leetcode_link": "https://leetcode.com/problems/subarray-sum-equals-k/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/count-subarrays-with-given-sum",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2221#count-subarrays-with-given-sum",
            "topic_tags": [
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              },
              {
                "id": "233",
                "name": "Hashing",
                "slug": "hashing"
              }
            ],
            "pattern_tags": [
              {
                "id": "187",
                "name": "Prefix / Precomputation",
                "slug": "prefix-precomputation"
              }
            ],
            "topic": "Hashing",
            "pattern": "Hashing & Prefix Sums"
          },
          {
            "id": 562,
            "label": "Count subarrays with given xor K",
            "slug": "count-subarrays-with-given-xor-k",
            "duration": "23 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/eZr-6p0B7ME",
            "leetcode_link": null,
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/count-subarrays-with-a-given-xor-k",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2221#count-subarrays-with-given-xor-k",
            "topic_tags": [
              {
                "id": "240",
                "name": "Bit Manipulation",
                "slug": "bit-manipulation"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "198",
                "name": "Bitwise XOR",
                "slug": "bitwise-xor"
              }
            ],
            "topic": "Hashing",
            "pattern": "Hashing & Prefix Sums"
          }
        ]
      }
    ]
  },
  {
    "id": 2223,
    "label": "Binary Search",
    "slug": "binary-search",
    "subtopics": [
      {
        "id": 2224,
        "label": "Binary Search",
        "slug": "binary-search",
        "questions": [
          {
            "id": 75,
            "label": "Find peak element",
            "slug": "find-peak-element",
            "duration": "32 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/cXxmbemS6XM",
            "leetcode_link": "https://leetcode.com/problems/find-peak-element/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/find-a-peak-element-in-an-array",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2223#find-peak-element",
            "topic_tags": [
              {
                "id": "236",
                "name": "Binary Search",
                "slug": "binary-search"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "191",
                "name": "Lower Bound / Upper Bound",
                "slug": "lower-bound-upper-bound"
              }
            ],
            "topic": "Binary Search",
            "pattern": "Binary Search"
          },
          {
            "id": 83,
            "label": "Find minimum in Rotated Sorted Array",
            "slug": "find-minimum-in-rotated-sorted-array",
            "duration": "15 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/nhEMDKMB44g",
            "leetcode_link": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/find-minimum-in-rotated-sorted-array",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2223#find-minimum-in-rotated-sorted-array",
            "topic_tags": [
              {
                "id": "236",
                "name": "Binary Search",
                "slug": "binary-search"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "192",
                "name": "Rotated Array Search",
                "slug": "rotated-array-search"
              }
            ],
            "topic": "Binary Search",
            "pattern": "Binary Search"
          },
          {
            "id": 88,
            "label": "Search in rotated sorted array-II",
            "slug": "search-in-rotated-sorted-array-2",
            "duration": "12 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/w2G2W8l__pc",
            "leetcode_link": "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/search-in-rotated-sorted-array-ii",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2223#search-in-rotated-sorted-array-2",
            "topic_tags": [
              {
                "id": "236",
                "name": "Binary Search",
                "slug": "binary-search"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "192",
                "name": "Rotated Array Search",
                "slug": "rotated-array-search"
              }
            ],
            "topic": "Binary Search",
            "pattern": "Binary Search"
          },
          {
            "id": 90,
            "label": "Single element in sorted array",
            "slug": "single-element-in-sorted-array",
            "duration": "22 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/AZOmHuHadxQ",
            "leetcode_link": "https://leetcode.com/problems/single-element-in-a-sorted-array/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/single-element-in-a-sorted-array",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2223#single-element-in-sorted-array",
            "topic_tags": [
              {
                "id": "236",
                "name": "Binary Search",
                "slug": "binary-search"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "191",
                "name": "Lower Bound / Upper Bound",
                "slug": "lower-bound-upper-bound"
              }
            ],
            "topic": "Binary Search",
            "pattern": "Binary Search"
          },
          {
            "id": 68,
            "label": "Search in 2D matrix - II",
            "slug": "search-in-2d-matrix-ii",
            "duration": "15 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/9ZbB397jU4k",
            "leetcode_link": "https://leetcode.com/problems/search-a-2d-matrix-ii/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/search-in-a-row-and-column-wise-sorted-matrix",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2223#search-in-2d-matrix-ii",
            "topic_tags": [
              {
                "id": "236",
                "name": "Binary Search",
                "slug": "binary-search"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "191",
                "name": "Lower Bound / Upper Bound",
                "slug": "lower-bound-upper-bound"
              }
            ],
            "topic": "Binary Search",
            "pattern": "Binary Search"
          },
          {
            "id": 65,
            "label": "Find Peak Element - II",
            "slug": "find-peak-element-ii",
            "duration": "20 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/nGGp5XBzC4g?si=WCop5C6Azj5gAELH",
            "leetcode_link": "https://leetcode.com/problems/find-a-peak-element-ii/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/find-peak-element-2d-matrix",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2223#find-peak-element-ii",
            "topic_tags": [
              {
                "id": "236",
                "name": "Binary Search",
                "slug": "binary-search"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "191",
                "name": "Lower Bound / Upper Bound",
                "slug": "lower-bound-upper-bound"
              }
            ],
            "topic": "Binary Search",
            "pattern": "Binary Search"
          }
        ]
      },
      {
        "id": 2225,
        "label": "Search on Answer",
        "slug": "search-on-answer",
        "questions": [
          {
            "id": 91,
            "label": "Find Nth root of a number",
            "slug": "find-nth-root-of-a-number",
            "duration": "20 min",
            "difficulty": "core",
            "yt_video": "https://www.youtube.com/watch?v=WjpswYrS2nY&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=62",
            "leetcode_link": null,
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2223#find-nth-root-of-a-number",
            "topic_tags": [
              {
                "id": "236",
                "name": "Binary Search",
                "slug": "binary-search"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "193",
                "name": "Search on Answer",
                "slug": "search-on-answer"
              }
            ],
            "topic": "Binary Search",
            "pattern": "Search on Answer"
          },
          {
            "id": 94,
            "label": "Koko eating bananas",
            "slug": "koko-eating-bananas",
            "duration": "20 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/qyfekrNni90",
            "leetcode_link": "https://leetcode.com/problems/koko-eating-bananas/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/koko-eating-bananas",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2223#koko-eating-bananas",
            "topic_tags": [
              {
                "id": "236",
                "name": "Binary Search",
                "slug": "binary-search"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "193",
                "name": "Search on Answer",
                "slug": "search-on-answer"
              }
            ],
            "topic": "Binary Search",
            "pattern": "Search on Answer"
          },
          {
            "id": 73,
            "label": "Aggressive Cows",
            "slug": "aggressive-cows",
            "duration": "26 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/R_Mfw4ew-Vo",
            "leetcode_link": null,
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/aggressive-cows",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2223#aggressive-cows",
            "topic_tags": [
              {
                "id": "236",
                "name": "Binary Search",
                "slug": "binary-search"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "193",
                "name": "Search on Answer",
                "slug": "search-on-answer"
              }
            ],
            "topic": "Binary Search",
            "pattern": "Search on Answer"
          },
          {
            "id": 74,
            "label": "Book Allocation Problem",
            "slug": "book-allocation-problem",
            "duration": "27 min",
            "difficulty": "pro",
            "yt_video": "https://www.youtube.com/watch?v=gYmWHvRHu-s&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=69",
            "leetcode_link": "https://leetcode.com/problems/split-array-largest-sum/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/book-allocation-problem",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2223#book-allocation-problem",
            "topic_tags": [
              {
                "id": "236",
                "name": "Binary Search",
                "slug": "binary-search"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "193",
                "name": "Search on Answer",
                "slug": "search-on-answer"
              }
            ],
            "topic": "Binary Search",
            "pattern": "Search on Answer"
          },
          {
            "id": 67,
            "label": "Matrix Median",
            "slug": "matrix-median",
            "duration": "23 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/Q9wXgdxJq48?si=ScI_0uzJh7yg8nrX",
            "leetcode_link": "https://leetcode.com/problems/median-of-a-row-wise-sorted-matrix/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/median-of-a-row-wise-sorted-matrix",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2223#matrix-median",
            "topic_tags": [
              {
                "id": "236",
                "name": "Binary Search",
                "slug": "binary-search"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "191",
                "name": "Lower Bound / Upper Bound",
                "slug": "lower-bound-upper-bound"
              }
            ],
            "topic": "Binary Search",
            "pattern": "Search on Answer"
          }
        ]
      },
      {
        "id": 2226,
        "label": "Partition Search",
        "slug": "partition-search",
        "questions": [
          {
            "id": 76,
            "label": "Kth element of 2 sorted arrays",
            "slug": "kth-element-of-2-sorted-arrays",
            "duration": "10 min",
            "difficulty": "pro",
            "yt_video": "https://www.youtube.com/watch?v=nv7F4PiLUzo&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=66",
            "leetcode_link": null,
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/kth-element-of-two-sorted-arrays",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2223#kth-element-of-2-sorted-arrays",
            "topic_tags": [
              {
                "id": "236",
                "name": "Binary Search",
                "slug": "binary-search"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "191",
                "name": "Lower Bound / Upper Bound",
                "slug": "lower-bound-upper-bound"
              }
            ],
            "topic": "Binary Search",
            "pattern": "Partition Search"
          },
          {
            "id": 77,
            "label": "Median of 2 sorted arrays",
            "slug": "median-of-2-sorted-arrays",
            "duration": "50 min",
            "difficulty": "pro",
            "yt_video": "https://www.youtube.com/watch?v=NTop3VTjmxk&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=65",
            "leetcode_link": "https://leetcode.com/problems/median-of-two-sorted-arrays/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/median-of-2-sorted-arrays",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2223#median-of-2-sorted-arrays",
            "topic_tags": [
              {
                "id": "236",
                "name": "Binary Search",
                "slug": "binary-search"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "191",
                "name": "Lower Bound / Upper Bound",
                "slug": "lower-bound-upper-bound"
              }
            ],
            "topic": "Binary Search",
            "pattern": "Partition Search"
          }
        ]
      }
    ]
  },
  {
    "id": 2227,
    "label": "Sliding Window and Two Pointers",
    "slug": "sliding-window-and-two-pointers",
    "subtopics": [
      {
        "id": 2228,
        "label": "Sliding Window",
        "slug": "sliding-window",
        "questions": [
          {
            "id": 929,
            "label": "Longest Substring Without Repeating Characters",
            "slug": "longest-substring-without-repeating-characters",
            "duration": "22 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/-zSxTJkcdAo?si=I2zfR-vlDMg0zU9z",
            "leetcode_link": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/longest-substring-without-repeating-characters",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2227#longest-substring-without-repeating-characters",
            "topic_tags": [
              {
                "id": "237",
                "name": "Strings",
                "slug": "strings"
              },
              {
                "id": "233",
                "name": "Hashing",
                "slug": "hashing"
              }
            ],
            "pattern_tags": [
              {
                "id": "189",
                "name": "Sliding Window",
                "slug": "sliding-window"
              }
            ],
            "topic": "Sliding Window and Two Pointers",
            "pattern": "Sliding Window"
          },
          {
            "id": 922,
            "label": "Maximum Points You Can Obtain from Cards ",
            "slug": "maximum-points-you-can-obtain-from-cards-",
            "duration": "11 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/pBWCOCS636U?si=-X64rY67noxvOwrG",
            "leetcode_link": "https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/maximum-points-you-can-obtain-from-cards",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2227#maximum-points-you-can-obtain-from-cards-",
            "topic_tags": [
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "189",
                "name": "Sliding Window",
                "slug": "sliding-window"
              }
            ],
            "topic": "Sliding Window and Two Pointers",
            "pattern": "Sliding Window"
          },
          {
            "id": 930,
            "label": " Max Consecutive Ones III",
            "slug": "max-consecutive-ones-iii",
            "duration": "29 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/3E4JBHSLpYk?si=SoOW64pP6otEKxBw",
            "leetcode_link": "https://leetcode.com/problems/max-consecutive-ones-iii/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/max-consecutive-ones-iii",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2227#max-consecutive-ones-iii",
            "topic_tags": [
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "189",
                "name": "Sliding Window",
                "slug": "sliding-window"
              }
            ],
            "topic": "Sliding Window and Two Pointers",
            "pattern": "Sliding Window"
          },
          {
            "id": 927,
            "label": "Longest Repeating Character Replacement",
            "slug": "longest-repeating-character-replacement",
            "duration": "25 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/_eNhaDCr6P0?si=pBWcEjozF5poom0p",
            "leetcode_link": "https://leetcode.com/problems/longest-repeating-character-replacement/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/longest-repeating-character-replacement",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2227#longest-repeating-character-replacement",
            "topic_tags": [
              {
                "id": "237",
                "name": "Strings",
                "slug": "strings"
              },
              {
                "id": "233",
                "name": "Hashing",
                "slug": "hashing"
              }
            ],
            "pattern_tags": [
              {
                "id": "189",
                "name": "Sliding Window",
                "slug": "sliding-window"
              }
            ],
            "topic": "Sliding Window and Two Pointers",
            "pattern": "Sliding Window"
          },
          {
            "id": 928,
            "label": "Longest Substring With At Most K Distinct Characters",
            "slug": "longest-substring-with-at-most-k-distinct-characters",
            "duration": "21 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/teM9ZsVRQyc?si=Kh0_u6aCkkBU3Q33",
            "leetcode_link": "https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/longest-substring-with-at-most-k-distinct-characters",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2227#longest-substring-with-at-most-k-distinct-characters",
            "topic_tags": [
              {
                "id": "237",
                "name": "Strings",
                "slug": "strings"
              },
              {
                "id": "233",
                "name": "Hashing",
                "slug": "hashing"
              }
            ],
            "pattern_tags": [
              {
                "id": "189",
                "name": "Sliding Window",
                "slug": "sliding-window"
              }
            ],
            "topic": "Sliding Window and Two Pointers",
            "pattern": "Sliding Window"
          },
          {
            "id": 931,
            "label": "Minimum Window Substring ",
            "slug": "minimum-window-substring-",
            "duration": "26 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/WJaij9ffOIY?si=-xnsWIH84zWU0ICd",
            "leetcode_link": "https://leetcode.com/problems/minimum-window-substring/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/minimum-window-substring",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2227#minimum-window-substring-",
            "topic_tags": [
              {
                "id": "237",
                "name": "Strings",
                "slug": "strings"
              },
              {
                "id": "233",
                "name": "Hashing",
                "slug": "hashing"
              }
            ],
            "pattern_tags": [
              {
                "id": "189",
                "name": "Sliding Window",
                "slug": "sliding-window"
              }
            ],
            "topic": "Sliding Window and Two Pointers",
            "pattern": "Sliding Window"
          }
        ]
      },
      {
        "id": 2229,
        "label": "Counting Windows",
        "slug": "counting-windows",
        "questions": [
          {
            "id": 925,
            "label": "Number of Substrings Containing All Three Characters",
            "slug": "number-of-substrings-containing-all-three-characters",
            "duration": "19 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/xtqN4qlgr8s?si=kuaLHVOLXhh5Z2tW",
            "leetcode_link": "https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/count-substrings-containing-all-three-characters-a-b-and-c",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2227#number-of-substrings-containing-all-three-characters",
            "topic_tags": [
              {
                "id": "237",
                "name": "Strings",
                "slug": "strings"
              },
              {
                "id": "233",
                "name": "Hashing",
                "slug": "hashing"
              }
            ],
            "pattern_tags": [
              {
                "id": "189",
                "name": "Sliding Window",
                "slug": "sliding-window"
              }
            ],
            "topic": "Sliding Window and Two Pointers",
            "pattern": "Counting Windows"
          },
          {
            "id": 923,
            "label": "Binary Subarrays With Sum",
            "slug": "binary-subarrays-with-sum",
            "duration": "20 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/XnMdNUkX6VM?si=Nyt8EveeLUg8lmty",
            "leetcode_link": "https://leetcode.com/problems/binary-subarrays-with-sum/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/binary-subarrays-with-sum",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2227#binary-subarrays-with-sum",
            "topic_tags": [
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              },
              {
                "id": "233",
                "name": "Hashing",
                "slug": "hashing"
              }
            ],
            "pattern_tags": [
              {
                "id": "189",
                "name": "Sliding Window",
                "slug": "sliding-window"
              }
            ],
            "topic": "Sliding Window and Two Pointers",
            "pattern": "Counting Windows"
          },
          {
            "id": 924,
            "label": "Count number of Nice subarrays",
            "slug": "count-number-of-nice-subarrays",
            "duration": "4 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/j_QOv9OT9Og?si=Oq5-5hyFkzVSOZpP",
            "leetcode_link": "https://leetcode.com/problems/count-number-of-nice-subarrays/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/count-nice-subarrays",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2227#count-number-of-nice-subarrays",
            "topic_tags": [
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              },
              {
                "id": "233",
                "name": "Hashing",
                "slug": "hashing"
              },
              {
                "id": "232",
                "name": "Mathematics",
                "slug": "mathematics"
              }
            ],
            "pattern_tags": [
              {
                "id": "189",
                "name": "Sliding Window",
                "slug": "sliding-window"
              }
            ],
            "topic": "Sliding Window and Two Pointers",
            "pattern": "Counting Windows"
          }
        ]
      }
    ]
  },
  {
    "id": 2230,
    "label": "Recursion and Backtracking",
    "slug": "recursion-and-backtracking",
    "subtopics": [
      {
        "id": 2231,
        "label": "Subsets & Combinations",
        "slug": "subsets-combinations",
        "questions": [
          {
            "id": 878,
            "label": "Power Set",
            "slug": "power-set",
            "duration": "20 min",
            "difficulty": "core",
            "yt_video": "https://www.youtube.com/watch?v=b7AYbpM5YrE&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=67",
            "leetcode_link": "https://leetcode.com/problems/subsets/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2230#power-set",
            "topic_tags": [
              {
                "id": "239",
                "name": "Recursion & Backtracking",
                "slug": "recursion-backtracking"
              }
            ],
            "pattern_tags": [
              {
                "id": "195",
                "name": "Subsets",
                "slug": "subsets"
              }
            ],
            "topic": "Recursion and Backtracking",
            "pattern": "Subsets & Combinations"
          },
          {
            "id": 876,
            "label": "Generate Parentheses",
            "slug": "generate-parentheses",
            "duration": "22 min",
            "difficulty": "core",
            "yt_video": null,
            "leetcode_link": "https://leetcode.com/problems/generate-parentheses/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2230#generate-parentheses",
            "topic_tags": [
              {
                "id": "239",
                "name": "Recursion & Backtracking",
                "slug": "recursion-backtracking"
              },
              {
                "id": "247",
                "name": "Dynamic Programming",
                "slug": "dynamic-programming"
              },
              {
                "id": "237",
                "name": "Strings",
                "slug": "strings"
              }
            ],
            "pattern_tags": [
              {
                "id": "196",
                "name": "Permutations & Combinations",
                "slug": "permutations-combinations"
              }
            ],
            "topic": "Recursion and Backtracking",
            "pattern": "Subsets & Combinations"
          },
          {
            "id": 875,
            "label": "Letter Combinations of a Phone Number",
            "slug": "letter-combinations-of-a-phone-number",
            "duration": "12 min",
            "difficulty": "pro",
            "yt_video": null,
            "leetcode_link": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2230#letter-combinations-of-a-phone-number",
            "topic_tags": [
              {
                "id": "239",
                "name": "Recursion & Backtracking",
                "slug": "recursion-backtracking"
              },
              {
                "id": "237",
                "name": "Strings",
                "slug": "strings"
              },
              {
                "id": "233",
                "name": "Hashing",
                "slug": "hashing"
              }
            ],
            "pattern_tags": [
              {
                "id": "196",
                "name": "Permutations & Combinations",
                "slug": "permutations-combinations"
              }
            ],
            "topic": "Recursion and Backtracking",
            "pattern": "Subsets & Combinations"
          },
          {
            "id": 864,
            "label": "Combination Sum",
            "slug": "combination-sum",
            "duration": "16 min",
            "difficulty": "core",
            "yt_video": "https://www.youtube.com/watch?v=OyZFFqQtu98&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=49",
            "leetcode_link": "https://leetcode.com/problems/combination-sum/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2230#combination-sum",
            "topic_tags": [
              {
                "id": "239",
                "name": "Recursion & Backtracking",
                "slug": "recursion-backtracking"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "196",
                "name": "Permutations & Combinations",
                "slug": "permutations-combinations"
              }
            ],
            "topic": "Recursion and Backtracking",
            "pattern": "Subsets & Combinations"
          },
          {
            "id": 865,
            "label": "Combination Sum II",
            "slug": "combination-sum-ii",
            "duration": "15 min",
            "difficulty": "core",
            "yt_video": "https://www.youtube.com/watch?v=G1fRTGRxXU8&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=50",
            "leetcode_link": "https://leetcode.com/problems/combination-sum-ii/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2230#combination-sum-ii",
            "topic_tags": [
              {
                "id": "239",
                "name": "Recursion & Backtracking",
                "slug": "recursion-backtracking"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "196",
                "name": "Permutations & Combinations",
                "slug": "permutations-combinations"
              }
            ],
            "topic": "Recursion and Backtracking",
            "pattern": "Subsets & Combinations"
          },
          {
            "id": 868,
            "label": "Subsets II",
            "slug": "subsets-ii",
            "duration": "21 min",
            "difficulty": "core",
            "yt_video": "https://www.youtube.com/watch?v=RIn3gOkbhQE&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=53",
            "leetcode_link": "https://leetcode.com/problems/subsets-ii/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2230#subsets-ii",
            "topic_tags": [
              {
                "id": "239",
                "name": "Recursion & Backtracking",
                "slug": "recursion-backtracking"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              },
              {
                "id": "240",
                "name": "Bit Manipulation",
                "slug": "bit-manipulation"
              }
            ],
            "pattern_tags": [
              {
                "id": "195",
                "name": "Subsets",
                "slug": "subsets"
              }
            ],
            "topic": "Recursion and Backtracking",
            "pattern": "Subsets & Combinations"
          },
          {
            "id": 871,
            "label": "Palindrome partitioning",
            "slug": "palindrome-partitioning",
            "duration": "18 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/_H8V5hJUGd0",
            "leetcode_link": "https://leetcode.com/problems/palindrome-partitioning/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2230#palindrome-partitioning",
            "topic_tags": [
              {
                "id": "239",
                "name": "Recursion & Backtracking",
                "slug": "recursion-backtracking"
              },
              {
                "id": "247",
                "name": "Dynamic Programming",
                "slug": "dynamic-programming"
              },
              {
                "id": "237",
                "name": "Strings",
                "slug": "strings"
              }
            ],
            "pattern_tags": [
              {
                "id": "196",
                "name": "Permutations & Combinations",
                "slug": "permutations-combinations"
              }
            ],
            "topic": "Recursion and Backtracking",
            "pattern": "Subsets & Combinations"
          }
        ]
      },
      {
        "id": 2232,
        "label": "Backtracking",
        "slug": "backtracking",
        "questions": [
          {
            "id": 874,
            "label": "Word Search",
            "slug": "word-search",
            "duration": "19 min",
            "difficulty": "pro",
            "yt_video": null,
            "leetcode_link": "https://leetcode.com/problems/word-search/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2230#word-search",
            "topic_tags": [
              {
                "id": "239",
                "name": "Recursion & Backtracking",
                "slug": "recursion-backtracking"
              },
              {
                "id": "237",
                "name": "Strings",
                "slug": "strings"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "197",
                "name": "Constraint Satisfaction",
                "slug": "constraint-satisfaction"
              }
            ],
            "topic": "Recursion and Backtracking",
            "pattern": "Backtracking"
          },
          {
            "id": 870,
            "label": "N Queen",
            "slug": "n-queen",
            "duration": "24 min",
            "difficulty": "pro",
            "yt_video": "https://www.youtube.com/watch?v=i05Ju7AftcM&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=57",
            "leetcode_link": "https://leetcode.com/problems/n-queens/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2230#n-queen",
            "topic_tags": [
              {
                "id": "239",
                "name": "Recursion & Backtracking",
                "slug": "recursion-backtracking"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "197",
                "name": "Constraint Satisfaction",
                "slug": "constraint-satisfaction"
              }
            ],
            "topic": "Recursion and Backtracking",
            "pattern": "Backtracking"
          },
          {
            "id": 873,
            "label": "Sudoku Solver",
            "slug": "sudoko-solver",
            "duration": "31 min",
            "difficulty": "pro",
            "yt_video": "https://www.youtube.com/watch?v=FWAIf_EVUKE&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=58",
            "leetcode_link": "https://leetcode.com/problems/sudoku-solver/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2230#sudoko-solver",
            "topic_tags": [
              {
                "id": "239",
                "name": "Recursion & Backtracking",
                "slug": "recursion-backtracking"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              },
              {
                "id": "233",
                "name": "Hashing",
                "slug": "hashing"
              }
            ],
            "pattern_tags": [
              {
                "id": "197",
                "name": "Constraint Satisfaction",
                "slug": "constraint-satisfaction"
              }
            ],
            "topic": "Recursion and Backtracking",
            "pattern": "Backtracking"
          }
        ]
      }
    ]
  },
  {
    "id": 2233,
    "label": "Linked List",
    "slug": "linked-list",
    "subtopics": [
      {
        "id": 2234,
        "label": "Fast & Slow Pointers",
        "slug": "fast-slow-pointers",
        "questions": [
          {
            "id": 448,
            "label": "Find Middle of Linked List",
            "slug": "find-middle-of-linked-list",
            "duration": "14 min",
            "difficulty": "basic",
            "yt_video": "https://youtu.be/7LjQ57RqgEc?si=ir_rRDio38rhamU_",
            "leetcode_link": "https://leetcode.com/problems/middle-of-the-linked-list/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/find-middle-of-linked-list",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2233#find-middle-of-linked-list",
            "topic_tags": [
              {
                "id": "238",
                "name": "Linked List",
                "slug": "linked-list"
              }
            ],
            "pattern_tags": [
              {
                "id": "203",
                "name": "Fast & Slow Pointers",
                "slug": "fast-slow-pointers"
              }
            ],
            "topic": "Linked List",
            "pattern": "Fast & Slow Pointers"
          },
          {
            "id": 621,
            "label": "Find the intersection point of Y LL",
            "slug": "find-the-intersection-point-of-y-ll",
            "duration": "32 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/0DYoPz2Tpt4?si=L-uJs5yXUxj4VJM2",
            "leetcode_link": "https://leetcode.com/problems/intersection-of-two-linked-lists/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/intersection-of-two-linked-lists",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2233#find-the-intersection-point-of-y-ll",
            "topic_tags": [
              {
                "id": "238",
                "name": "Linked List",
                "slug": "linked-list"
              }
            ],
            "pattern_tags": [
              {
                "id": "188",
                "name": "Two Pointer",
                "slug": "two-pointer"
              }
            ],
            "topic": "Linked List",
            "pattern": "Fast & Slow Pointers"
          },
          {
            "id": 618,
            "label": "Check if LL is palindrome or not",
            "slug": "check-if-ll-is-palindrome-or-not",
            "duration": "20 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/lRY_G-u_8jk?si=BpM8hRYvXSYyjl-G",
            "leetcode_link": "https://leetcode.com/problems/palindrome-linked-list/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/check-if-a-linked-list-is-a-palindrome",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2233#check-if-ll-is-palindrome-or-not",
            "topic_tags": [
              {
                "id": "238",
                "name": "Linked List",
                "slug": "linked-list"
              }
            ],
            "pattern_tags": [
              {
                "id": "203",
                "name": "Fast & Slow Pointers",
                "slug": "fast-slow-pointers"
              },
              {
                "id": "204",
                "name": "In-place Reversal",
                "slug": "in-place-reversal"
              }
            ],
            "topic": "Linked List",
            "pattern": "Fast & Slow Pointers"
          },
          {
            "id": 620,
            "label": "Detect a loop in LL",
            "slug": "detect-a-loop-in-ll",
            "duration": "20 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/wiOo4DC5GGA?si=zagt6O6tFXc4_3cx",
            "leetcode_link": "https://leetcode.com/problems/linked-list-cycle/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/detect-cycle-linked-list",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2233#detect-a-loop-in-ll",
            "topic_tags": [
              {
                "id": "238",
                "name": "Linked List",
                "slug": "linked-list"
              }
            ],
            "pattern_tags": [
              {
                "id": "203",
                "name": "Fast & Slow Pointers",
                "slug": "fast-slow-pointers"
              }
            ],
            "topic": "Linked List",
            "pattern": "Fast & Slow Pointers"
          },
          {
            "id": 626,
            "label": "Remove Nth node from the back of the LL",
            "slug": "remove-nth-node-from-the-back-of-the-ll",
            "duration": "16 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/3kMKYQ2wNIU?si=DtFDnPU7z9HMz_GM",
            "leetcode_link": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/remove-the-nth-node-from-the-end-of-a-linked-list",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2233#remove-nth-node-from-the-back-of-the-ll",
            "topic_tags": [
              {
                "id": "238",
                "name": "Linked List",
                "slug": "linked-list"
              }
            ],
            "pattern_tags": [
              {
                "id": "188",
                "name": "Two Pointer",
                "slug": "two-pointer"
              }
            ],
            "topic": "Linked List",
            "pattern": "Fast & Slow Pointers"
          },
          {
            "id": 622,
            "label": "Find the starting point in LL",
            "slug": "find-the-starting-point-in-ll",
            "duration": "21 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/2Kd0KKmmHFc?si=7UreDPRjRvapeVB0",
            "leetcode_link": "https://leetcode.com/problems/linked-list-cycle-ii/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/find-start-of-cycle-linked-list",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2233#find-the-starting-point-in-ll",
            "topic_tags": [
              {
                "id": "238",
                "name": "Linked List",
                "slug": "linked-list"
              }
            ],
            "pattern_tags": [
              {
                "id": "203",
                "name": "Fast & Slow Pointers",
                "slug": "fast-slow-pointers"
              }
            ],
            "topic": "Linked List",
            "pattern": "Fast & Slow Pointers"
          },
          {
            "id": 623,
            "label": "Length of loop in LL",
            "slug": "length-of-loop-in-ll",
            "duration": "14 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/I4g1qbkTPus?si=ONktpqewvx57T8pF",
            "leetcode_link": null,
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/length-of-cycle-linked-list",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2233#length-of-loop-in-ll",
            "topic_tags": [
              {
                "id": "238",
                "name": "Linked List",
                "slug": "linked-list"
              }
            ],
            "pattern_tags": [
              {
                "id": "203",
                "name": "Fast & Slow Pointers",
                "slug": "fast-slow-pointers"
              }
            ],
            "topic": "Linked List",
            "pattern": "Fast & Slow Pointers"
          }
        ]
      },
      {
        "id": 2235,
        "label": "Reversal & Rewiring",
        "slug": "reversal-rewiring",
        "questions": [
          {
            "id": 627,
            "label": "Reverse a LL",
            "slug": "reverse-a-ll",
            "duration": "32 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/D2vI2DNJGd8?si=RCaLSx01qR21IBdh",
            "leetcode_link": "https://leetcode.com/problems/reverse-linked-list/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/reverse-a-singly-linked-list",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2233#reverse-a-ll",
            "topic_tags": [
              {
                "id": "238",
                "name": "Linked List",
                "slug": "linked-list"
              }
            ],
            "pattern_tags": [
              {
                "id": "204",
                "name": "In-place Reversal",
                "slug": "in-place-reversal"
              }
            ],
            "topic": "Linked List",
            "pattern": "Reversal & Rewiring"
          },
          {
            "id": 613,
            "label": "Merge two Sorted Lists ",
            "slug": "merge-sorted-lists-",
            "duration": "18 min",
            "difficulty": "core",
            "yt_video": "https://www.youtube.com/watch?v=Xb4slcp1U38&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=29",
            "leetcode_link": "https://leetcode.com/problems/merge-two-sorted-lists/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/merge-two-sorted-linked-lists",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2233#merge-sorted-lists-",
            "topic_tags": [
              {
                "id": "238",
                "name": "Linked List",
                "slug": "linked-list"
              },
              {
                "id": "239",
                "name": "Recursion & Backtracking",
                "slug": "recursion-backtracking"
              }
            ],
            "pattern_tags": [
              {
                "id": "188",
                "name": "Two Pointer",
                "slug": "two-pointer"
              }
            ],
            "topic": "Linked List",
            "pattern": "Reversal & Rewiring"
          },
          {
            "id": 629,
            "label": "Sort a Linked List of 0's 1's and 2's",
            "slug": "sort-a-ll-of-0's-1's-and-2's",
            "duration": "22 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/gRII7LhdJWc?si=l3qRC7w3NhY7OAqw",
            "leetcode_link": null,
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/sort-linked-list-0s-1s-2s-changing-links",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2233#sort-a-ll-of-0's-1's-and-2's",
            "topic_tags": [
              {
                "id": "238",
                "name": "Linked List",
                "slug": "linked-list"
              }
            ],
            "pattern_tags": [
              {
                "id": "186",
                "name": "Frequency Counting",
                "slug": "frequency-counting"
              }
            ],
            "topic": "Linked List",
            "pattern": "Reversal & Rewiring"
          },
          {
            "id": 625,
            "label": "Add two numbers in Linked List",
            "slug": "add-two-numbers-in-ll",
            "duration": "14 min",
            "difficulty": "core",
            "yt_video": "https://www.youtube.com/watch?v=LBVsXSMOIk4&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=32",
            "leetcode_link": "https://leetcode.com/problems/add-two-numbers/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/add-two-numbers-linked-lists-reverse-order",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2233#add-two-numbers-in-ll",
            "topic_tags": [
              {
                "id": "238",
                "name": "Linked List",
                "slug": "linked-list"
              }
            ],
            "pattern_tags": [
              {
                "id": "185",
                "name": "Simulation / Implementation",
                "slug": "simulation-implementation"
              }
            ],
            "topic": "Linked List",
            "pattern": "Reversal & Rewiring"
          },
          {
            "id": 615,
            "label": "Rotate a LL",
            "slug": "rotate-a-ll",
            "duration": "12 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/uT7YI7XbTY8?si=ZaChW3a68c_v54Is",
            "leetcode_link": "https://leetcode.com/problems/rotate-list/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/rotate-linked-list-right-k-places",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2233#rotate-a-ll",
            "topic_tags": [
              {
                "id": "238",
                "name": "Linked List",
                "slug": "linked-list"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "188",
                "name": "Two Pointer",
                "slug": "two-pointer"
              }
            ],
            "topic": "Linked List",
            "pattern": "Reversal & Rewiring"
          },
          {
            "id": 616,
            "label": "Sort LL",
            "slug": "sort-ll",
            "duration": "22 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/8ocB7a_c-Cc?si=Gv-Y8q8-WyARoV35",
            "leetcode_link": "https://leetcode.com/problems/sort-list/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/sort-a-linked-list-using-merge-sort",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2233#sort-ll",
            "topic_tags": [
              {
                "id": "238",
                "name": "Linked List",
                "slug": "linked-list"
              }
            ],
            "pattern_tags": [
              {
                "id": "194",
                "name": "Divide and Conquer",
                "slug": "divide-and-conquer"
              }
            ],
            "topic": "Linked List",
            "pattern": "Reversal & Rewiring"
          },
          {
            "id": 611,
            "label": "Clone a LL with random and next pointer",
            "slug": "clone-a-ll-with-random-and-next-pointer",
            "duration": "33 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/q570bKdrnlw?si=epZtpWvtNwuTf23o",
            "leetcode_link": "https://leetcode.com/problems/copy-list-with-random-pointer/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/clone-linked-list-random-pointer",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2233#clone-a-ll-with-random-and-next-pointer",
            "topic_tags": [
              {
                "id": "238",
                "name": "Linked List",
                "slug": "linked-list"
              }
            ],
            "pattern_tags": [
              {
                "id": "185",
                "name": "Simulation / Implementation",
                "slug": "simulation-implementation"
              }
            ],
            "topic": "Linked List",
            "pattern": "Reversal & Rewiring"
          },
          {
            "id": 614,
            "label": "Reverse LL in group of given size K",
            "slug": "reverse-ll-in-group-of-given-size-k",
            "duration": "24 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/lIar1skcQYI?si=_jFghHKX4eaK36a1",
            "leetcode_link": "https://leetcode.com/problems/reverse-nodes-in-k-group/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/reverse-linked-list-k-groups",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2233#reverse-ll-in-group-of-given-size-k",
            "topic_tags": [
              {
                "id": "238",
                "name": "Linked List",
                "slug": "linked-list"
              }
            ],
            "pattern_tags": [
              {
                "id": "204",
                "name": "In-place Reversal",
                "slug": "in-place-reversal"
              }
            ],
            "topic": "Linked List",
            "pattern": "Reversal & Rewiring"
          },
          {
            "id": 612,
            "label": "Flattening of LL",
            "slug": "flattening-of-ll",
            "duration": "33 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/ykelywHJWLg?si=InMg9MmTHzY22NSR",
            "leetcode_link": "https://leetcode.com/problems/merge-k-sorted-lists/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/flatten-linked-list",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2233#flattening-of-ll",
            "topic_tags": [
              {
                "id": "238",
                "name": "Linked List",
                "slug": "linked-list"
              }
            ],
            "pattern_tags": [
              {
                "id": "209",
                "name": "K-way Merge",
                "slug": "k-way-merge"
              }
            ],
            "topic": "Linked List",
            "pattern": "Reversal & Rewiring"
          }
        ]
      }
    ]
  },
  {
    "id": 2236,
    "label": "Stack and Queues",
    "slug": "stack-and-queues",
    "subtopics": [
      {
        "id": 2237,
        "label": "Monotonic Stack / Queue",
        "slug": "monotonic-stack-queue",
        "questions": [
          {
            "id": 968,
            "label": "Next Greater Element",
            "slug": "next-greater-element",
            "duration": "18 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/e7XQLtOQM3I?si=QdcHpTtx6gAHsext",
            "leetcode_link": "https://leetcode.com/problems/next-greater-element-i/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2236#next-greater-element",
            "topic_tags": [
              {
                "id": "241",
                "name": "Stack & Queues",
                "slug": "stack-queues"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "202",
                "name": "Monotonic Stack / Queue",
                "slug": "monotonic-stack-queue"
              }
            ],
            "topic": "Stack and Queues",
            "pattern": "Monotonic Stack / Queue"
          },
          {
            "id": 969,
            "label": "Next Greater Element - 2",
            "slug": "next-greater-element---2",
            "duration": "15 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/7PrncD7v9YQ?si=UkBc7eVy9HGlBpeW",
            "leetcode_link": "https://leetcode.com/problems/next-greater-element-ii/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2236#next-greater-element---2",
            "topic_tags": [
              {
                "id": "241",
                "name": "Stack & Queues",
                "slug": "stack-queues"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "202",
                "name": "Monotonic Stack / Queue",
                "slug": "monotonic-stack-queue"
              }
            ],
            "topic": "Stack and Queues",
            "pattern": "Monotonic Stack / Queue"
          },
          {
            "id": 964,
            "label": "Stock span problem",
            "slug": "stock-span-problem",
            "duration": "19 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/eay-zoSRkVc?si=deNNe5i38BOAntha",
            "leetcode_link": "https://leetcode.com/problems/online-stock-span/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/stock-span-problem",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2236#stock-span-problem",
            "topic_tags": [
              {
                "id": "241",
                "name": "Stack & Queues",
                "slug": "stack-queues"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "202",
                "name": "Monotonic Stack / Queue",
                "slug": "monotonic-stack-queue"
              }
            ],
            "topic": "Stack and Queues",
            "pattern": "Monotonic Stack / Queue"
          },
          {
            "id": 971,
            "label": "Sum of Subarray Minimums",
            "slug": "sum-of-subarray-minimums",
            "duration": "23 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/v0e8p9JCgRc?si=XAU7ekECgS5nboRw",
            "leetcode_link": "https://leetcode.com/problems/sum-of-subarray-minimums/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2236#sum-of-subarray-minimums",
            "topic_tags": [
              {
                "id": "241",
                "name": "Stack & Queues",
                "slug": "stack-queues"
              },
              {
                "id": "247",
                "name": "Dynamic Programming",
                "slug": "dynamic-programming"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "202",
                "name": "Monotonic Stack / Queue",
                "slug": "monotonic-stack-queue"
              }
            ],
            "topic": "Stack and Queues",
            "pattern": "Monotonic Stack / Queue"
          },
          {
            "id": 972,
            "label": "Sum of Subarray Ranges",
            "slug": "sum-of-subarray-ranges",
            "duration": "10 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/gIrMptNPf5M?si=Q_GHuBvzZVs27X_U",
            "leetcode_link": "https://leetcode.com/problems/sum-of-subarray-ranges/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2236#sum-of-subarray-ranges",
            "topic_tags": [
              {
                "id": "241",
                "name": "Stack & Queues",
                "slug": "stack-queues"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "202",
                "name": "Monotonic Stack / Queue",
                "slug": "monotonic-stack-queue"
              }
            ],
            "topic": "Stack and Queues",
            "pattern": "Monotonic Stack / Queue"
          },
          {
            "id": 970,
            "label": "Remove K Digits",
            "slug": "remove-k-digits",
            "duration": "15 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/jmbuRzYPGrg?si=WN387gwQ7aXWkUao",
            "leetcode_link": "https://leetcode.com/problems/remove-k-digits/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2236#remove-k-digits",
            "topic_tags": [
              {
                "id": "241",
                "name": "Stack & Queues",
                "slug": "stack-queues"
              },
              {
                "id": "237",
                "name": "Strings",
                "slug": "strings"
              }
            ],
            "pattern_tags": [
              {
                "id": "202",
                "name": "Monotonic Stack / Queue",
                "slug": "monotonic-stack-queue"
              }
            ],
            "topic": "Stack and Queues",
            "pattern": "Monotonic Stack / Queue"
          },
          {
            "id": 963,
            "label": "Sliding Window Maximum",
            "slug": "sliding-window-maximum",
            "duration": "20 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/NwBvene4Imo?si=eU1PY-bcQfk5wdog",
            "leetcode_link": "https://leetcode.com/problems/sliding-window-maximum/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2236#sliding-window-maximum",
            "topic_tags": [
              {
                "id": "241",
                "name": "Stack & Queues",
                "slug": "stack-queues"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              },
              {
                "id": "242",
                "name": "Heaps",
                "slug": "heaps"
              }
            ],
            "pattern_tags": [
              {
                "id": "202",
                "name": "Monotonic Stack / Queue",
                "slug": "monotonic-stack-queue"
              }
            ],
            "topic": "Stack and Queues",
            "pattern": "Monotonic Stack / Queue"
          },
          {
            "id": 959,
            "label": "Largest rectangle in a histogram",
            "slug": "largest-rectangle-in-a-histogram",
            "duration": "31 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/Bzat9vgD0fs?si=DiBlLejXcr6EJoyB",
            "leetcode_link": "https://leetcode.com/problems/largest-rectangle-in-histogram/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/largest-rectangle-in-histogram",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2236#largest-rectangle-in-a-histogram",
            "topic_tags": [
              {
                "id": "241",
                "name": "Stack & Queues",
                "slug": "stack-queues"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "202",
                "name": "Monotonic Stack / Queue",
                "slug": "monotonic-stack-queue"
              }
            ],
            "topic": "Stack and Queues",
            "pattern": "Monotonic Stack / Queue"
          },
          {
            "id": 962,
            "label": "Maximum Rectangles",
            "slug": "maximum-rectangles",
            "duration": "12 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/tOylVCugy9k",
            "leetcode_link": "https://leetcode.com/problems/maximal-rectangle/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2236#maximum-rectangles",
            "topic_tags": [
              {
                "id": "241",
                "name": "Stack & Queues",
                "slug": "stack-queues"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "202",
                "name": "Monotonic Stack / Queue",
                "slug": "monotonic-stack-queue"
              }
            ],
            "topic": "Stack and Queues",
            "pattern": "Monotonic Stack / Queue"
          }
        ]
      },
      {
        "id": 2238,
        "label": "Data Structure Design",
        "slug": "data-structure-design",
        "questions": [
          {
            "id": 958,
            "label": "Implement Min Stack",
            "slug": "implement-min-stack",
            "duration": "21 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/NdDIaH91P0g?si=4_Jbsq5trFvfSdUY",
            "leetcode_link": "https://leetcode.com/problems/min-stack/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2236#implement-min-stack",
            "topic_tags": [
              {
                "id": "241",
                "name": "Stack & Queues",
                "slug": "stack-queues"
              }
            ],
            "pattern_tags": [
              {
                "id": "185",
                "name": "Simulation / Implementation",
                "slug": "simulation-implementation"
              }
            ],
            "topic": "Stack and Queues",
            "pattern": "Data Structure Design"
          },
          {
            "id": 967,
            "label": "Asteroid Collision",
            "slug": "asteroid-collision",
            "duration": "17 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/_eYGqw_VDR4?si=YyxibcHq800RqgIQ",
            "leetcode_link": "https://leetcode.com/problems/asteroid-collision/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/asteroid-collision",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2236#asteroid-collision",
            "topic_tags": [
              {
                "id": "241",
                "name": "Stack & Queues",
                "slug": "stack-queues"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "185",
                "name": "Simulation / Implementation",
                "slug": "simulation-implementation"
              }
            ],
            "topic": "Stack and Queues",
            "pattern": "Data Structure Design"
          },
          {
            "id": 957,
            "label": "Celebrity Problem",
            "slug": "celebrity-problem",
            "duration": "16 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/cEadsbTeze4?si=olXYfOs7l-SEn2zl",
            "leetcode_link": "https://leetcode.com/problems/find-the-celebrity/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2236#celebrity-problem",
            "topic_tags": [
              {
                "id": "241",
                "name": "Stack & Queues",
                "slug": "stack-queues"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "185",
                "name": "Simulation / Implementation",
                "slug": "simulation-implementation"
              }
            ],
            "topic": "Stack and Queues",
            "pattern": "Data Structure Design"
          },
          {
            "id": 961,
            "label": "LRU Cache",
            "slug": "lru-cache",
            "duration": "25 min",
            "difficulty": "pro",
            "yt_video": "https://www.youtube.com/watch?v=z9bJUPxzFOw",
            "leetcode_link": "https://leetcode.com/problems/lru-cache/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2236#lru-cache",
            "topic_tags": [
              {
                "id": "238",
                "name": "Linked List",
                "slug": "linked-list"
              },
              {
                "id": "233",
                "name": "Hashing",
                "slug": "hashing"
              }
            ],
            "pattern_tags": [
              {
                "id": "185",
                "name": "Simulation / Implementation",
                "slug": "simulation-implementation"
              }
            ],
            "topic": "Stack and Queues",
            "pattern": "Data Structure Design"
          },
          {
            "id": 960,
            "label": "LFU Cache",
            "slug": "lfu-cache",
            "duration": null,
            "difficulty": "pro",
            "yt_video": "https://www.youtube.com/watch?v=0PSB9y8ehbk&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=79",
            "leetcode_link": "https://leetcode.com/problems/lfu-cache/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2236#lfu-cache",
            "topic_tags": [
              {
                "id": "238",
                "name": "Linked List",
                "slug": "linked-list"
              },
              {
                "id": "233",
                "name": "Hashing",
                "slug": "hashing"
              }
            ],
            "pattern_tags": [
              {
                "id": "185",
                "name": "Simulation / Implementation",
                "slug": "simulation-implementation"
              }
            ],
            "topic": "Stack and Queues",
            "pattern": "Data Structure Design"
          }
        ]
      }
    ]
  },
  {
    "id": 2239,
    "label": "Greedy Algorithms",
    "slug": "greedy-algorithms",
    "subtopics": [
      {
        "id": 2240,
        "label": "Greedy",
        "slug": "greedy",
        "questions": [
          {
            "id": 542,
            "label": "Jump Game - I",
            "slug": "jump-game---i",
            "duration": "10 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/tZAa_jJ3SwQ?si=voKd7n9VTLDRRNzJ",
            "leetcode_link": "https://leetcode.com/problems/jump-game/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/jump-game",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2239#jump-game---i",
            "topic_tags": [
              {
                "id": "243",
                "name": "Greedy Algorithms",
                "slug": "greedy-algorithms"
              },
              {
                "id": "247",
                "name": "Dynamic Programming",
                "slug": "dynamic-programming"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "210",
                "name": "Greedy Choice",
                "slug": "greedy-choice"
              }
            ],
            "topic": "Greedy Algorithms",
            "pattern": "Greedy"
          },
          {
            "id": 545,
            "label": "Valid Paranthesis Checker",
            "slug": "valid-paranthesis-checker",
            "duration": "25 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/cHT6sG_hUZI?si=XRHeyh7jOaLaTy3g",
            "leetcode_link": "https://leetcode.com/problems/valid-parenthesis-string/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2239#valid-paranthesis-checker",
            "topic_tags": [
              {
                "id": "243",
                "name": "Greedy Algorithms",
                "slug": "greedy-algorithms"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "210",
                "name": "Greedy Choice",
                "slug": "greedy-choice"
              }
            ],
            "topic": "Greedy Algorithms",
            "pattern": "Greedy"
          },
          {
            "id": 544,
            "label": "Candy",
            "slug": "candy",
            "duration": "30 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/IIqVFvKE6RY?si=EjmuXZJNLQLUkEd7",
            "leetcode_link": "https://leetcode.com/problems/candy/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/candy-distribution-problem",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2239#candy",
            "topic_tags": [
              {
                "id": "243",
                "name": "Greedy Algorithms",
                "slug": "greedy-algorithms"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "210",
                "name": "Greedy Choice",
                "slug": "greedy-choice"
              }
            ],
            "topic": "Greedy Algorithms",
            "pattern": "Greedy"
          }
        ]
      },
      {
        "id": 2241,
        "label": "Intervals & Scheduling",
        "slug": "intervals-scheduling",
        "questions": [
          {
            "id": 549,
            "label": "N meetings in one room",
            "slug": "n-meetings-in-one-room",
            "duration": "13 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/mKfhTotEguk?si=2RELeq18mpmIIN3Q",
            "leetcode_link": null,
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/n-meetings-in-one-room",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2239#n-meetings-in-one-room",
            "topic_tags": [
              {
                "id": "243",
                "name": "Greedy Algorithms",
                "slug": "greedy-algorithms"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "211",
                "name": "Intervals / Scheduling",
                "slug": "intervals-scheduling"
              }
            ],
            "topic": "Greedy Algorithms",
            "pattern": "Intervals & Scheduling"
          },
          {
            "id": 546,
            "label": "Insert Interval",
            "slug": "insert-interval",
            "duration": "13 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/xxRE-46OCC8?si=a7aPuIw16zDx2lAa",
            "leetcode_link": "https://leetcode.com/problems/insert-interval/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/insert-interval",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2239#insert-interval",
            "topic_tags": [
              {
                "id": "243",
                "name": "Greedy Algorithms",
                "slug": "greedy-algorithms"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "211",
                "name": "Intervals / Scheduling",
                "slug": "intervals-scheduling"
              }
            ],
            "topic": "Greedy Algorithms",
            "pattern": "Intervals & Scheduling"
          },
          {
            "id": 550,
            "label": "Non-overlapping Intervals",
            "slug": "non-overlapping-intervals",
            "duration": "8 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/HDHQ8lAWakY?si=JVtLqboGdpUTOVjf",
            "leetcode_link": "https://leetcode.com/problems/non-overlapping-intervals/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/non-overlapping-intervals",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2239#non-overlapping-intervals",
            "topic_tags": [
              {
                "id": "243",
                "name": "Greedy Algorithms",
                "slug": "greedy-algorithms"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "211",
                "name": "Intervals / Scheduling",
                "slug": "intervals-scheduling"
              },
              {
                "id": "190",
                "name": "Sort and Scan",
                "slug": "sort-and-scan"
              }
            ],
            "topic": "Greedy Algorithms",
            "pattern": "Intervals & Scheduling"
          },
          {
            "id": 548,
            "label": "Minimum number of platforms required for a railway",
            "slug": "minimum-number-of-platforms-required-for-a-railway",
            "duration": "18 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/AsGzwR_FWok?si=165acXU_dtqOHuo9",
            "leetcode_link": "https://leetcode.com/problems/divide-intervals-into-minimum-number-of-groups/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/minimum-platforms-required-for-a-railway-station",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2239#minimum-number-of-platforms-required-for-a-railway",
            "topic_tags": [
              {
                "id": "243",
                "name": "Greedy Algorithms",
                "slug": "greedy-algorithms"
              },
              {
                "id": "232",
                "name": "Mathematics",
                "slug": "mathematics"
              }
            ],
            "pattern_tags": [
              {
                "id": "211",
                "name": "Intervals / Scheduling",
                "slug": "intervals-scheduling"
              }
            ],
            "topic": "Greedy Algorithms",
            "pattern": "Intervals & Scheduling"
          },
          {
            "id": 547,
            "label": "Job sequencing Problem",
            "slug": "job-sequencing-problem",
            "duration": "16 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/QbwltemZbRg?si=wvcemJ5BLPlTRmkG",
            "leetcode_link": null,
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/job-sequencing-problem",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2239#job-sequencing-problem",
            "topic_tags": [
              {
                "id": "243",
                "name": "Greedy Algorithms",
                "slug": "greedy-algorithms"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "210",
                "name": "Greedy Choice",
                "slug": "greedy-choice"
              }
            ],
            "topic": "Greedy Algorithms",
            "pattern": "Intervals & Scheduling"
          }
        ]
      }
    ]
  },
  {
    "id": 2242,
    "label": "Heaps",
    "slug": "heaps",
    "subtopics": [
      {
        "id": 2243,
        "label": "Heap / Priority Queue",
        "slug": "heap-priority-queue",
        "questions": [
          {
            "id": 573,
            "label": "Heapify Algorithm",
            "slug": "heapify-algorithm",
            "duration": "23 min",
            "difficulty": "core",
            "yt_video": null,
            "leetcode_link": null,
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2242#heapify-algorithm",
            "topic_tags": [
              {
                "id": "242",
                "name": "Heaps",
                "slug": "heaps"
              }
            ],
            "pattern_tags": [
              {
                "id": "185",
                "name": "Simulation / Implementation",
                "slug": "simulation-implementation"
              }
            ],
            "topic": "Heaps",
            "pattern": "Heap / Priority Queue"
          },
          {
            "id": 570,
            "label": "Build heap from a given Array",
            "slug": "build-heap-from-a-given-array",
            "duration": "15 min",
            "difficulty": "core",
            "yt_video": null,
            "leetcode_link": null,
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2242#build-heap-from-a-given-array",
            "topic_tags": [
              {
                "id": "242",
                "name": "Heaps",
                "slug": "heaps"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "185",
                "name": "Simulation / Implementation",
                "slug": "simulation-implementation"
              }
            ],
            "topic": "Heaps",
            "pattern": "Heap / Priority Queue"
          },
          {
            "id": 576,
            "label": "Implement Min Heap",
            "slug": "implement-min-heap",
            "duration": "12 min",
            "difficulty": "core",
            "yt_video": null,
            "leetcode_link": null,
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2242#implement-min-heap",
            "topic_tags": [
              {
                "id": "242",
                "name": "Heaps",
                "slug": "heaps"
              }
            ],
            "pattern_tags": [
              {
                "id": "185",
                "name": "Simulation / Implementation",
                "slug": "simulation-implementation"
              }
            ],
            "topic": "Heaps",
            "pattern": "Heap / Priority Queue"
          },
          {
            "id": 578,
            "label": "K-th Largest element in an array",
            "slug": "k-th-largest-element-in-an-array",
            "duration": "44 min",
            "difficulty": "pro",
            "yt_video": null,
            "leetcode_link": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/k-th-largest-element-in-an-array",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2242#k-th-largest-element-in-an-array",
            "topic_tags": [
              {
                "id": "242",
                "name": "Heaps",
                "slug": "heaps"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "207",
                "name": "Top K Elements",
                "slug": "top-k-elements"
              },
              {
                "id": "219",
                "name": "Priority Queue",
                "slug": "priority-queue"
              }
            ],
            "topic": "Heaps",
            "pattern": "Heap / Priority Queue"
          },
          {
            "id": 566,
            "label": "Find Median from Data Stream",
            "slug": "find-median-from-data-stream",
            "duration": null,
            "difficulty": "pro",
            "yt_video": null,
            "leetcode_link": "https://leetcode.com/problems/find-median-from-data-stream/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/find-median-data-stream",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2242#find-median-from-data-stream",
            "topic_tags": [
              {
                "id": "242",
                "name": "Heaps",
                "slug": "heaps"
              }
            ],
            "pattern_tags": [
              {
                "id": "208",
                "name": "Two Heaps",
                "slug": "two-heaps"
              },
              {
                "id": "219",
                "name": "Priority Queue",
                "slug": "priority-queue"
              }
            ],
            "topic": "Heaps",
            "pattern": "Heap / Priority Queue"
          }
        ]
      }
    ]
  },
  {
    "id": 2244,
    "label": "Binary Trees",
    "slug": "binary-trees",
    "subtopics": [
      {
        "id": 2245,
        "label": "BFS",
        "slug": "bfs",
        "questions": [
          {
            "id": 134,
            "label": "Level Order Traversal",
            "slug": "level-order-traversal",
            "duration": "8 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/EoAsWbO7sqg",
            "leetcode_link": "https://leetcode.com/problems/binary-tree-level-order-traversal/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/binary-tree-level-order-traversal",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2244#level-order-traversal",
            "topic_tags": [
              {
                "id": "244",
                "name": "Binary Trees",
                "slug": "binary-trees"
              }
            ],
            "pattern_tags": [
              {
                "id": "206",
                "name": "BFS / Level Order",
                "slug": "bfs-level-order"
              }
            ],
            "topic": "Binary Trees",
            "pattern": "BFS"
          },
          {
            "id": 119,
            "label": "Maximum Width of BT",
            "slug": "maximum-width-of-bt",
            "duration": "21 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/ZbybYvcVLks",
            "leetcode_link": "https://leetcode.com/problems/maximum-width-of-binary-tree/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2244#maximum-width-of-bt",
            "topic_tags": [
              {
                "id": "244",
                "name": "Binary Trees",
                "slug": "binary-trees"
              }
            ],
            "pattern_tags": [
              {
                "id": "206",
                "name": "BFS / Level Order",
                "slug": "bfs-level-order"
              }
            ],
            "topic": "Binary Trees",
            "pattern": "BFS"
          },
          {
            "id": 123,
            "label": "Right/Left View of BT",
            "slug": "right-left-view-of-bt",
            "duration": "12 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/KV4mRzTjlAk",
            "leetcode_link": "https://leetcode.com/problems/binary-tree-right-side-view/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/left-and-right-views-of-a-binary-tree",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2244#right-left-view-of-bt",
            "topic_tags": [
              {
                "id": "244",
                "name": "Binary Trees",
                "slug": "binary-trees"
              }
            ],
            "pattern_tags": [
              {
                "id": "206",
                "name": "BFS / Level Order",
                "slug": "bfs-level-order"
              }
            ],
            "topic": "Binary Trees",
            "pattern": "BFS"
          },
          {
            "id": 124,
            "label": "Top View of BT",
            "slug": "top-view-of-bt",
            "duration": "9 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/Et9OCDNvJ78",
            "leetcode_link": null,
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/top-view-of-binary-tree",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2244#top-view-of-bt",
            "topic_tags": [
              {
                "id": "244",
                "name": "Binary Trees",
                "slug": "binary-trees"
              }
            ],
            "pattern_tags": [
              {
                "id": "206",
                "name": "BFS / Level Order",
                "slug": "bfs-level-order"
              }
            ],
            "topic": "Binary Trees",
            "pattern": "BFS"
          },
          {
            "id": 121,
            "label": "Print all nodes at a distance of K in BT",
            "slug": "print-all-nodes-at-a-distance-of-k-in-bt",
            "duration": "16 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/i9ORlEy6EsI",
            "leetcode_link": "https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/nodes-distance-k-binary-tree",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2244#print-all-nodes-at-a-distance-of-k-in-bt",
            "topic_tags": [
              {
                "id": "244",
                "name": "Binary Trees",
                "slug": "binary-trees"
              }
            ],
            "pattern_tags": [
              {
                "id": "205",
                "name": "Tree DFS / Recursive Decomposition",
                "slug": "tree-dfs-recursive-decomposition"
              }
            ],
            "topic": "Binary Trees",
            "pattern": "BFS"
          },
          {
            "id": 120,
            "label": "Minimum time taken to burn the BT from a given Node",
            "slug": "minimum-time-taken-to-burn-the-bt-from-a-given-node",
            "duration": "17 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/2r5wLmQfD6g",
            "leetcode_link": null,
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/minimum-time-burn-binary-tree",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2244#minimum-time-taken-to-burn-the-bt-from-a-given-node",
            "topic_tags": [
              {
                "id": "244",
                "name": "Binary Trees",
                "slug": "binary-trees"
              }
            ],
            "pattern_tags": [
              {
                "id": "205",
                "name": "Tree DFS / Recursive Decomposition",
                "slug": "tree-dfs-recursive-decomposition"
              }
            ],
            "topic": "Binary Trees",
            "pattern": "BFS"
          },
          {
            "id": 125,
            "label": "Vertical Order Traversal",
            "slug": "vertical-order-traversal",
            "duration": "18 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/q_a6lpbKJdw",
            "leetcode_link": "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/vertical-order-traversal-of-a-binary-tree",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2244#vertical-order-traversal",
            "topic_tags": [
              {
                "id": "244",
                "name": "Binary Trees",
                "slug": "binary-trees"
              }
            ],
            "pattern_tags": [
              {
                "id": "206",
                "name": "BFS / Level Order",
                "slug": "bfs-level-order"
              }
            ],
            "topic": "Binary Trees",
            "pattern": "BFS"
          }
        ]
      },
      {
        "id": 2246,
        "label": "DFS / Tree DP",
        "slug": "dfs-tree-dp",
        "questions": [
          {
            "id": 122,
            "label": "Print root to leaf path in BT",
            "slug": "print-root-to-leaf-path-in-bt",
            "duration": "10 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/fmflMqVOC7k",
            "leetcode_link": null,
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/print-root-to-leaf-path-in-binary-tree",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2244#print-root-to-leaf-path-in-bt",
            "topic_tags": [
              {
                "id": "244",
                "name": "Binary Trees",
                "slug": "binary-trees"
              }
            ],
            "pattern_tags": [
              {
                "id": "205",
                "name": "Tree DFS / Recursive Decomposition",
                "slug": "tree-dfs-recursive-decomposition"
              }
            ],
            "topic": "Binary Trees",
            "pattern": "DFS / Tree DP"
          },
          {
            "id": 130,
            "label": "Diameter of Binary Tree",
            "slug": "diameter-of-binary-tree",
            "duration": "13 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/Rezetez59Nk",
            "leetcode_link": "https://leetcode.com/problems/diameter-of-binary-tree/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/diameter-of-a-binary-tree",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2244#diameter-of-binary-tree",
            "topic_tags": [
              {
                "id": "244",
                "name": "Binary Trees",
                "slug": "binary-trees"
              }
            ],
            "pattern_tags": [
              {
                "id": "205",
                "name": "Tree DFS / Recursive Decomposition",
                "slug": "tree-dfs-recursive-decomposition"
              }
            ],
            "topic": "Binary Trees",
            "pattern": "DFS / Tree DP"
          },
          {
            "id": 118,
            "label": "LCA in BT",
            "slug": "lca-in-bt",
            "duration": "13 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/_-QHfMDde90",
            "leetcode_link": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/lowest-common-ancestor-in-a-binary-tree",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2244#lca-in-bt",
            "topic_tags": [
              {
                "id": "244",
                "name": "Binary Trees",
                "slug": "binary-trees"
              }
            ],
            "pattern_tags": [
              {
                "id": "205",
                "name": "Tree DFS / Recursive Decomposition",
                "slug": "tree-dfs-recursive-decomposition"
              }
            ],
            "topic": "Binary Trees",
            "pattern": "DFS / Tree DP"
          },
          {
            "id": 116,
            "label": "Boundary Traversal",
            "slug": "boundary-traversal",
            "duration": "9 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/0ca1nvR0be4",
            "leetcode_link": "https://leetcode.com/problems/boundary-of-binary-tree/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/boundary-traversal-of-a-binary-tree",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2244#boundary-traversal",
            "topic_tags": [
              {
                "id": "244",
                "name": "Binary Trees",
                "slug": "binary-trees"
              }
            ],
            "pattern_tags": [
              {
                "id": "205",
                "name": "Tree DFS / Recursive Decomposition",
                "slug": "tree-dfs-recursive-decomposition"
              }
            ],
            "topic": "Binary Trees",
            "pattern": "DFS / Tree DP"
          },
          {
            "id": 110,
            "label": "Construct a BT from Preorder and Inorder",
            "slug": "construct-a-bt-from-preorder-and-inorder",
            "duration": "18 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/aZNaLrVebKQ",
            "leetcode_link": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/construct-a-binary-tree-from-preorder-and-inorder",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2244#construct-a-bt-from-preorder-and-inorder",
            "topic_tags": [
              {
                "id": "244",
                "name": "Binary Trees",
                "slug": "binary-trees"
              },
              {
                "id": "233",
                "name": "Hashing",
                "slug": "hashing"
              }
            ],
            "pattern_tags": [
              {
                "id": "205",
                "name": "Tree DFS / Recursive Decomposition",
                "slug": "tree-dfs-recursive-decomposition"
              }
            ],
            "topic": "Binary Trees",
            "pattern": "DFS / Tree DP"
          },
          {
            "id": 139,
            "label": "Morris Inorder Traversal ",
            "slug": "morris-inorder-traversal-",
            "duration": "19 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/80Zug6D1_r4",
            "leetcode_link": "https://leetcode.com/problems/binary-tree-inorder-traversal/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/morris-inorder-traversal",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2244#morris-inorder-traversal-",
            "topic_tags": [
              {
                "id": "244",
                "name": "Binary Trees",
                "slug": "binary-trees"
              }
            ],
            "pattern_tags": [
              {
                "id": "205",
                "name": "Tree DFS / Recursive Decomposition",
                "slug": "tree-dfs-recursive-decomposition"
              }
            ],
            "topic": "Binary Trees",
            "pattern": "DFS / Tree DP"
          },
          {
            "id": 132,
            "label": "Maximum path sum ",
            "slug": "maximum-path-sum-",
            "duration": "17 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/WszrfSwMz58",
            "leetcode_link": "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/binary-tree-maximum-path-sum",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2244#maximum-path-sum-",
            "topic_tags": [
              {
                "id": "244",
                "name": "Binary Trees",
                "slug": "binary-trees"
              }
            ],
            "pattern_tags": [
              {
                "id": "205",
                "name": "Tree DFS / Recursive Decomposition",
                "slug": "tree-dfs-recursive-decomposition"
              }
            ],
            "topic": "Binary Trees",
            "pattern": "DFS / Tree DP"
          },
          {
            "id": 112,
            "label": "Serialize and De-serialize BT",
            "slug": "serialize-and-de-serialize-bt",
            "duration": "16 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/-YbXySKJsX8",
            "leetcode_link": "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/serialize-and-deserialize-a-binary-tree",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2244#serialize-and-de-serialize-bt",
            "topic_tags": [
              {
                "id": "244",
                "name": "Binary Trees",
                "slug": "binary-trees"
              }
            ],
            "pattern_tags": [
              {
                "id": "205",
                "name": "Tree DFS / Recursive Decomposition",
                "slug": "tree-dfs-recursive-decomposition"
              }
            ],
            "topic": "Binary Trees",
            "pattern": "DFS / Tree DP"
          }
        ]
      }
    ]
  },
  {
    "id": 2247,
    "label": "Binary Search Trees",
    "slug": "binary-search-trees",
    "subtopics": [
      {
        "id": 2248,
        "label": "Inorder Traversal",
        "slug": "inorder-traversal",
        "questions": [
          {
            "id": 104,
            "label": "Insert a given node in BST",
            "slug": "insert-a-given-node-in-bst",
            "duration": "7 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/FiFiNvM29ps",
            "leetcode_link": "https://leetcode.com/problems/insert-into-a-binary-search-tree/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/insert-into-a-binary-search-tree",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2247#insert-a-given-node-in-bst",
            "topic_tags": [
              {
                "id": "245",
                "name": "Binary Search Trees",
                "slug": "binary-search-trees"
              }
            ],
            "pattern_tags": [
              {
                "id": "191",
                "name": "Lower Bound / Upper Bound",
                "slug": "lower-bound-upper-bound"
              }
            ],
            "topic": "Binary Search Trees",
            "pattern": "Inorder Traversal"
          },
          {
            "id": 106,
            "label": "LCA in BST",
            "slug": "lca-in-bst",
            "duration": "8 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/cX_kPV_foZc",
            "leetcode_link": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/lowest-common-ancestor-of-a-binary-search-tree",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2247#lca-in-bst",
            "topic_tags": [
              {
                "id": "245",
                "name": "Binary Search Trees",
                "slug": "binary-search-trees"
              }
            ],
            "pattern_tags": [
              {
                "id": "205",
                "name": "Tree DFS / Recursive Decomposition",
                "slug": "tree-dfs-recursive-decomposition"
              }
            ],
            "topic": "Binary Search Trees",
            "pattern": "Inorder Traversal"
          },
          {
            "id": 102,
            "label": "Delete a node in BST",
            "slug": "delete-a-node-in-bst",
            "duration": "15 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/kouxiP_H5WE",
            "leetcode_link": "https://leetcode.com/problems/delete-node-in-a-bst/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/delete-node-in-a-bst",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2247#delete-a-node-in-bst",
            "topic_tags": [
              {
                "id": "245",
                "name": "Binary Search Trees",
                "slug": "binary-search-trees"
              }
            ],
            "pattern_tags": [
              {
                "id": "191",
                "name": "Lower Bound / Upper Bound",
                "slug": "lower-bound-upper-bound"
              }
            ],
            "topic": "Binary Search Trees",
            "pattern": "Inorder Traversal"
          },
          {
            "id": 103,
            "label": "Inorder successor and predecessor in BST",
            "slug": "inorder-successor-and-predecessor-in-bst",
            "duration": "10 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/SXKAD2svfmI",
            "leetcode_link": "https://leetcode.com/problems/inorder-successor-in-bst/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/inorder-successor-and-predecessor-in-a-bst",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2247#inorder-successor-and-predecessor-in-bst",
            "topic_tags": [
              {
                "id": "245",
                "name": "Binary Search Trees",
                "slug": "binary-search-trees"
              }
            ],
            "pattern_tags": [
              {
                "id": "191",
                "name": "Lower Bound / Upper Bound",
                "slug": "lower-bound-upper-bound"
              }
            ],
            "topic": "Binary Search Trees",
            "pattern": "Inorder Traversal"
          },
          {
            "id": 105,
            "label": "Kth Smallest and Largest element in BST",
            "slug": "kth-smallest-and-largest-element-in-bst",
            "duration": "8 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/9TJYWh0adfk",
            "leetcode_link": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/kth-smallest-and-largest-elements-in-a-bst",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2247#kth-smallest-and-largest-element-in-bst",
            "topic_tags": [
              {
                "id": "245",
                "name": "Binary Search Trees",
                "slug": "binary-search-trees"
              }
            ],
            "pattern_tags": [
              {
                "id": "205",
                "name": "Tree DFS / Recursive Decomposition",
                "slug": "tree-dfs-recursive-decomposition"
              }
            ],
            "topic": "Binary Search Trees",
            "pattern": "Inorder Traversal"
          },
          {
            "id": 100,
            "label": "Check if a tree is a BST or not",
            "slug": "check-if-a-tree-is-a-bst-or-not",
            "duration": "9 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/f-sj7I5oXEI",
            "leetcode_link": "https://leetcode.com/problems/validate-binary-search-tree/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/validate-binary-search-tree",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2247#check-if-a-tree-is-a-bst-or-not",
            "topic_tags": [
              {
                "id": "245",
                "name": "Binary Search Trees",
                "slug": "binary-search-trees"
              },
              {
                "id": "244",
                "name": "Binary Trees",
                "slug": "binary-trees"
              }
            ],
            "pattern_tags": [
              {
                "id": "205",
                "name": "Tree DFS / Recursive Decomposition",
                "slug": "tree-dfs-recursive-decomposition"
              }
            ],
            "topic": "Binary Search Trees",
            "pattern": "Inorder Traversal"
          },
          {
            "id": 101,
            "label": "Construct a BST from a preorder traversal",
            "slug": "construct-a-bst-from-a-preorder-traversal",
            "duration": "16 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/UmJT3j26t1I",
            "leetcode_link": "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/construct-a-bst-from-preorder-traversal",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2247#construct-a-bst-from-a-preorder-traversal",
            "topic_tags": [
              {
                "id": "245",
                "name": "Binary Search Trees",
                "slug": "binary-search-trees"
              }
            ],
            "pattern_tags": [
              {
                "id": "205",
                "name": "Tree DFS / Recursive Decomposition",
                "slug": "tree-dfs-recursive-decomposition"
              }
            ],
            "topic": "Binary Search Trees",
            "pattern": "Inorder Traversal"
          },
          {
            "id": 99,
            "label": "Two sum in BST",
            "slug": "two-sum-in-bst",
            "duration": "14 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/ssL3sHwPeb4",
            "leetcode_link": "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/two-sum-in-bst",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2247#two-sum-in-bst",
            "topic_tags": [
              {
                "id": "245",
                "name": "Binary Search Trees",
                "slug": "binary-search-trees"
              }
            ],
            "pattern_tags": [
              {
                "id": "188",
                "name": "Two Pointer",
                "slug": "two-pointer"
              }
            ],
            "topic": "Binary Search Trees",
            "pattern": "Inorder Traversal"
          },
          {
            "id": 97,
            "label": "Correct BST with two nodes swapped",
            "slug": "correct-bst-with-two-nodes-swapped",
            "duration": "16 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/ZWGW7FminDM",
            "leetcode_link": "https://leetcode.com/problems/recover-binary-search-tree/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/recover-binary-search-tree",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2247#correct-bst-with-two-nodes-swapped",
            "topic_tags": [
              {
                "id": "245",
                "name": "Binary Search Trees",
                "slug": "binary-search-trees"
              }
            ],
            "pattern_tags": [
              {
                "id": "205",
                "name": "Tree DFS / Recursive Decomposition",
                "slug": "tree-dfs-recursive-decomposition"
              }
            ],
            "topic": "Binary Search Trees",
            "pattern": "Inorder Traversal"
          },
          {
            "id": 98,
            "label": "Largest BST in Binary Tree",
            "slug": "largest-bst-in-binary-tree",
            "duration": "17 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/X0oXMdtUDwo",
            "leetcode_link": "https://leetcode.com/problems/largest-bst-subtree/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/largest-bst-in-binary-tree",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2247#largest-bst-in-binary-tree",
            "topic_tags": [
              {
                "id": "245",
                "name": "Binary Search Trees",
                "slug": "binary-search-trees"
              }
            ],
            "pattern_tags": [
              {
                "id": "205",
                "name": "Tree DFS / Recursive Decomposition",
                "slug": "tree-dfs-recursive-decomposition"
              }
            ],
            "topic": "Binary Search Trees",
            "pattern": "Inorder Traversal"
          }
        ]
      }
    ]
  },
  {
    "id": 2249,
    "label": "Graphs",
    "slug": "graphs",
    "subtopics": [
      {
        "id": 2250,
        "label": "BFS / DFS",
        "slug": "bfs-dfs",
        "questions": [
          {
            "id": 531,
            "label": "Flood fill algorithm",
            "slug": "flood-fill-algorithm",
            "duration": "20 min",
            "difficulty": "core",
            "yt_video": null,
            "leetcode_link": "https://leetcode.com/problems/flood-fill/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/flood-fill-algorithm",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#flood-fill-algorithm",
            "topic_tags": [
              {
                "id": "246",
                "name": "Graphs",
                "slug": "graphs"
              }
            ],
            "pattern_tags": [
              {
                "id": "212",
                "name": "Graph DFS / Connected Components",
                "slug": "graph-dfs-connected-components"
              }
            ],
            "topic": "Graphs",
            "pattern": "BFS / DFS"
          },
          {
            "id": 534,
            "label": "Number of islands",
            "slug": "number-of-islands",
            "duration": "24 min",
            "difficulty": "core",
            "yt_video": "https://www.youtube.com/watch?v=muncqlKJrH0&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn&index=8",
            "leetcode_link": "https://leetcode.com/problems/number-of-islands/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#number-of-islands",
            "topic_tags": [
              {
                "id": "246",
                "name": "Graphs",
                "slug": "graphs"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "212",
                "name": "Graph DFS / Connected Components",
                "slug": "graph-dfs-connected-components"
              }
            ],
            "topic": "Graphs",
            "pattern": "BFS / DFS"
          },
          {
            "id": 536,
            "label": "Rotten Oranges",
            "slug": "rotten-oranges",
            "duration": "22 min",
            "difficulty": "core",
            "yt_video": "https://www.youtube.com/watch?v=yf3oUhkvqA0",
            "leetcode_link": "https://leetcode.com/problems/rotting-oranges/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/rotting-oranges",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#rotten-oranges",
            "topic_tags": [
              {
                "id": "246",
                "name": "Graphs",
                "slug": "graphs"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "206",
                "name": "BFS / Level Order",
                "slug": "bfs-level-order"
              }
            ],
            "topic": "Graphs",
            "pattern": "BFS / DFS"
          },
          {
            "id": 530,
            "label": "Distance of nearest cell having one",
            "slug": "distance-of-nearest-cell-having-one",
            "duration": "20 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/edXdVwkYHF8",
            "leetcode_link": "https://leetcode.com/problems/01-matrix/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/distance-of-the-nearest-cell-having-1-in-a-binary-matrix",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#distance-of-nearest-cell-having-one",
            "topic_tags": [
              {
                "id": "246",
                "name": "Graphs",
                "slug": "graphs"
              }
            ],
            "pattern_tags": [
              {
                "id": "206",
                "name": "BFS / Level Order",
                "slug": "bfs-level-order"
              }
            ],
            "topic": "Graphs",
            "pattern": "BFS / DFS"
          },
          {
            "id": 537,
            "label": "Surrounded Regions",
            "slug": "surrounded-regions",
            "duration": "23 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/BtdgAys4yMk",
            "leetcode_link": "https://leetcode.com/problems/surrounded-regions/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/surrounded-regions",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#surrounded-regions",
            "topic_tags": [
              {
                "id": "246",
                "name": "Graphs",
                "slug": "graphs"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "212",
                "name": "Graph DFS / Connected Components",
                "slug": "graph-dfs-connected-components"
              }
            ],
            "topic": "Graphs",
            "pattern": "BFS / DFS"
          },
          {
            "id": 532,
            "label": "Number of distinct islands",
            "slug": "number-of-distinct-islands",
            "duration": "18 min",
            "difficulty": "core",
            "yt_video": null,
            "leetcode_link": "https://leetcode.com/problems/number-of-distinct-islands/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/number-of-distinct-islands",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#number-of-distinct-islands",
            "topic_tags": [
              {
                "id": "246",
                "name": "Graphs",
                "slug": "graphs"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              },
              {
                "id": "233",
                "name": "Hashing",
                "slug": "hashing"
              }
            ],
            "pattern_tags": [
              {
                "id": "212",
                "name": "Graph DFS / Connected Components",
                "slug": "graph-dfs-connected-components"
              }
            ],
            "topic": "Graphs",
            "pattern": "BFS / DFS"
          },
          {
            "id": 501,
            "label": "Detect a cycle in an undirected graph",
            "slug": "detect-a-cycle-in-an-undirected-graph",
            "duration": "38 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/zQ3zgFypzX4",
            "leetcode_link": "https://leetcode.com/problems/course-schedule/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/detect-a-cycle-in-an-undirected-graph",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#detect-a-cycle-in-an-undirected-graph",
            "topic_tags": [
              {
                "id": "246",
                "name": "Graphs",
                "slug": "graphs"
              }
            ],
            "pattern_tags": [
              {
                "id": "212",
                "name": "Graph DFS / Connected Components",
                "slug": "graph-dfs-connected-components"
              }
            ],
            "topic": "Graphs",
            "pattern": "BFS / DFS"
          },
          {
            "id": 499,
            "label": "Bipartite graph",
            "slug": "bipartite-graph",
            "duration": "32 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/KG5YFfR0j8A",
            "leetcode_link": "https://leetcode.com/problems/is-graph-bipartite/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#bipartite-graph",
            "topic_tags": [
              {
                "id": "246",
                "name": "Graphs",
                "slug": "graphs"
              }
            ],
            "pattern_tags": [
              {
                "id": "212",
                "name": "Graph DFS / Connected Components",
                "slug": "graph-dfs-connected-components"
              }
            ],
            "topic": "Graphs",
            "pattern": "BFS / DFS"
          }
        ]
      },
      {
        "id": 2251,
        "label": "Ordering & Connectivity",
        "slug": "ordering-connectivity",
        "questions": [
          {
            "id": 500,
            "label": "Detect a cycle in a directed graph",
            "slug": "detect-a-cycle-in-a-directed-graph",
            "duration": "23 min",
            "difficulty": "core",
            "yt_video": "https://www.youtube.com/watch?v=uzVUw90ZFIg&list=PLgUwDviBIf0rGEWe64KWas0Nryn7SCRWw&index=12",
            "leetcode_link": "https://leetcode.com/problems/course-schedule/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/detect-a-cycle-in-a-directed-graph",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#detect-a-cycle-in-a-directed-graph",
            "topic_tags": [
              {
                "id": "246",
                "name": "Graphs",
                "slug": "graphs"
              }
            ],
            "pattern_tags": [
              {
                "id": "213",
                "name": "Topological Ordering",
                "slug": "topological-ordering"
              }
            ],
            "topic": "Graphs",
            "pattern": "Ordering & Connectivity"
          },
          {
            "id": 502,
            "label": "Topological sort or Kahn's algorithm",
            "slug": "topological-sort-or-kahns-algorithm",
            "duration": "26 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/5lZ0iJMrUMk",
            "leetcode_link": null,
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#topological-sort-or-kahns-algorithm",
            "topic_tags": [
              {
                "id": "246",
                "name": "Graphs",
                "slug": "graphs"
              }
            ],
            "pattern_tags": [
              {
                "id": "213",
                "name": "Topological Ordering",
                "slug": "topological-ordering"
              }
            ],
            "topic": "Graphs",
            "pattern": "Ordering & Connectivity"
          },
          {
            "id": 505,
            "label": "Course Schedule II",
            "slug": "course-schedule-ii",
            "duration": "11 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/WAOfKpxYHR8",
            "leetcode_link": "https://leetcode.com/problems/course-schedule-ii/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/course-schedule-ii",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#course-schedule-ii",
            "topic_tags": [
              {
                "id": "246",
                "name": "Graphs",
                "slug": "graphs"
              }
            ],
            "pattern_tags": [
              {
                "id": "213",
                "name": "Topological Ordering",
                "slug": "topological-ordering"
              }
            ],
            "topic": "Graphs",
            "pattern": "Ordering & Connectivity"
          },
          {
            "id": 503,
            "label": "Alien Dictionary",
            "slug": "alient-dictionary",
            "duration": "20 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/U3N_je7tWAs",
            "leetcode_link": "https://leetcode.com/problems/alien-dictionary/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/alien-dictionary",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#alient-dictionary",
            "topic_tags": [
              {
                "id": "246",
                "name": "Graphs",
                "slug": "graphs"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              },
              {
                "id": "237",
                "name": "Strings",
                "slug": "strings"
              }
            ],
            "pattern_tags": [
              {
                "id": "213",
                "name": "Topological Ordering",
                "slug": "topological-ordering"
              }
            ],
            "topic": "Graphs",
            "pattern": "Ordering & Connectivity"
          },
          {
            "id": 498,
            "label": "Kosaraju's algorithm",
            "slug": "kosaraju's-algorithm",
            "duration": "22 min",
            "difficulty": "pro",
            "yt_video": "https://www.youtube.com/watch?v=V8qIqJxCioo&list=PLgUwDviBIf0rGEWe64KWas0Nryn7SCRWw&index=27",
            "leetcode_link": "https://leetcode.com/problems/maximum-number-of-non-overlapping-substrings/discuss/766485/kosaraju-algorithm-on",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/kosarajus-algorithm",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#kosaraju's-algorithm",
            "topic_tags": [
              {
                "id": "246",
                "name": "Graphs",
                "slug": "graphs"
              }
            ],
            "pattern_tags": [
              {
                "id": "212",
                "name": "Graph DFS / Connected Components",
                "slug": "graph-dfs-connected-components"
              }
            ],
            "topic": "Graphs",
            "pattern": "Ordering & Connectivity"
          },
          {
            "id": 497,
            "label": "Bridges in graph",
            "slug": "bridges-in-graph",
            "duration": "23 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/qrAub5z8FeA",
            "leetcode_link": "https://leetcode.com/problems/critical-connections-in-a-network/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/bridges-in-graph-tarjan-algorithm",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#bridges-in-graph",
            "topic_tags": [
              {
                "id": "246",
                "name": "Graphs",
                "slug": "graphs"
              }
            ],
            "pattern_tags": [
              {
                "id": "212",
                "name": "Graph DFS / Connected Components",
                "slug": "graph-dfs-connected-components"
              }
            ],
            "topic": "Graphs",
            "pattern": "Ordering & Connectivity"
          },
          {
            "id": 496,
            "label": "Articulation point in graph",
            "slug": "articulation-point-in-graph",
            "duration": "21 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/j1QDfU21iZk",
            "leetcode_link": null,
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/articulation-points-in-graph",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#articulation-point-in-graph",
            "topic_tags": [
              {
                "id": "246",
                "name": "Graphs",
                "slug": "graphs"
              }
            ],
            "pattern_tags": [
              {
                "id": "212",
                "name": "Graph DFS / Connected Components",
                "slug": "graph-dfs-connected-components"
              }
            ],
            "topic": "Graphs",
            "pattern": "Ordering & Connectivity"
          }
        ]
      },
      {
        "id": 2252,
        "label": "Shortest Path",
        "slug": "shortest-path",
        "questions": [
          {
            "id": 508,
            "label": "Shortest path in undirected graph with unit weights",
            "slug": "shortest-path-in-undirected-graph-with-unit-weights",
            "duration": "16 min",
            "difficulty": "core",
            "yt_video": "https://www.youtube.com/watch?v=C4gxoTaI71U&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn&index=28",
            "leetcode_link": null,
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/shortest-path-in-an-unweighted-undirected-graph-using-bfs",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#shortest-path-in-undirected-graph-with-unit-weights",
            "topic_tags": [
              {
                "id": "246",
                "name": "Graphs",
                "slug": "graphs"
              }
            ],
            "pattern_tags": [
              {
                "id": "214",
                "name": "Shortest Path",
                "slug": "shortest-path"
              }
            ],
            "topic": "Graphs",
            "pattern": "Shortest Path"
          },
          {
            "id": 507,
            "label": "Shortest path in DAG",
            "slug": "shortest-path-in-dag",
            "duration": "26 min",
            "difficulty": "core",
            "yt_video": "https://www.youtube.com/watch?v=ZUFQfFaU-8U&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn&index=27",
            "leetcode_link": null,
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/shortest-path-in-a-directed-acyclic-graph-dag",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#shortest-path-in-dag",
            "topic_tags": [
              {
                "id": "246",
                "name": "Graphs",
                "slug": "graphs"
              }
            ],
            "pattern_tags": [
              {
                "id": "214",
                "name": "Shortest Path",
                "slug": "shortest-path"
              }
            ],
            "topic": "Graphs",
            "pattern": "Shortest Path"
          },
          {
            "id": 520,
            "label": "Dijkstra's algorithm",
            "slug": "dijkstra's-algorithm",
            "duration": "47 min",
            "difficulty": "core",
            "yt_video": "https://www.youtube.com/watch?v=rp1SMw7HSO8&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn&index=35",
            "leetcode_link": null,
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/dijkstras-algorithm",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#dijkstra's-algorithm",
            "topic_tags": [
              {
                "id": "246",
                "name": "Graphs",
                "slug": "graphs"
              },
              {
                "id": "242",
                "name": "Heaps",
                "slug": "heaps"
              }
            ],
            "pattern_tags": [
              {
                "id": "214",
                "name": "Shortest Path",
                "slug": "shortest-path"
              },
              {
                "id": "219",
                "name": "Priority Queue",
                "slug": "priority-queue"
              }
            ],
            "topic": "Graphs",
            "pattern": "Shortest Path"
          },
          {
            "id": 525,
            "label": "Path with minimum effort",
            "slug": "path-with-minimum-effort",
            "duration": "24 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/0ytpZyiZFhA",
            "leetcode_link": "https://leetcode.com/problems/path-with-minimum-effort/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/path-with-minimum-effort",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#path-with-minimum-effort",
            "topic_tags": [
              {
                "id": "246",
                "name": "Graphs",
                "slug": "graphs"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              },
              {
                "id": "242",
                "name": "Heaps",
                "slug": "heaps"
              }
            ],
            "pattern_tags": [
              {
                "id": "214",
                "name": "Shortest Path",
                "slug": "shortest-path"
              }
            ],
            "topic": "Graphs",
            "pattern": "Shortest Path"
          },
          {
            "id": 519,
            "label": "Cheapest flight within K stops",
            "slug": "cheapest-flight-within-k-stops",
            "duration": "23 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/9XybHVqTHcQ",
            "leetcode_link": "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/cheapest-flights-within-k-stops",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#cheapest-flight-within-k-stops",
            "topic_tags": [
              {
                "id": "246",
                "name": "Graphs",
                "slug": "graphs"
              },
              {
                "id": "247",
                "name": "Dynamic Programming",
                "slug": "dynamic-programming"
              },
              {
                "id": "242",
                "name": "Heaps",
                "slug": "heaps"
              }
            ],
            "pattern_tags": [
              {
                "id": "214",
                "name": "Shortest Path",
                "slug": "shortest-path"
              }
            ],
            "topic": "Graphs",
            "pattern": "Shortest Path"
          },
          {
            "id": 518,
            "label": "Bellman ford algorithm",
            "slug": "bellman-ford-algorithm",
            "duration": "27 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/0vVofAhAYjc",
            "leetcode_link": null,
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/bellman-ford-algorithm",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#bellman-ford-algorithm",
            "topic_tags": [
              {
                "id": "246",
                "name": "Graphs",
                "slug": "graphs"
              }
            ],
            "pattern_tags": [
              {
                "id": "214",
                "name": "Shortest Path",
                "slug": "shortest-path"
              }
            ],
            "topic": "Graphs",
            "pattern": "Shortest Path"
          },
          {
            "id": 522,
            "label": "Floyd warshall algorithm",
            "slug": "floyd-warshall-algorithm",
            "duration": "30 min",
            "difficulty": "pro",
            "yt_video": "https://www.youtube.com/watch?v=YbY8cVwWAvw&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn&index=42",
            "leetcode_link": null,
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#floyd-warshall-algorithm",
            "topic_tags": [
              {
                "id": "246",
                "name": "Graphs",
                "slug": "graphs"
              }
            ],
            "pattern_tags": [
              {
                "id": "214",
                "name": "Shortest Path",
                "slug": "shortest-path"
              }
            ],
            "topic": "Graphs",
            "pattern": "Shortest Path"
          },
          {
            "id": 509,
            "label": "Word ladder I",
            "slug": "word-ladder-i",
            "duration": "28 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/tRPda0rcf8E",
            "leetcode_link": "https://leetcode.com/problems/word-ladder/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/word-ladder",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#word-ladder-i",
            "topic_tags": [
              {
                "id": "246",
                "name": "Graphs",
                "slug": "graphs"
              },
              {
                "id": "237",
                "name": "Strings",
                "slug": "strings"
              },
              {
                "id": "233",
                "name": "Hashing",
                "slug": "hashing"
              }
            ],
            "pattern_tags": [
              {
                "id": "206",
                "name": "BFS / Level Order",
                "slug": "bfs-level-order"
              }
            ],
            "topic": "Graphs",
            "pattern": "Shortest Path"
          },
          {
            "id": 510,
            "label": "Word ladder II",
            "slug": "word-ladder-ii",
            "duration": "48 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/AD4SFl7tu7I?si=EpcJQTWm2YeURvEG",
            "leetcode_link": "https://leetcode.com/problems/word-ladder-ii/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/word-ladder-ii",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#word-ladder-ii",
            "topic_tags": [
              {
                "id": "246",
                "name": "Graphs",
                "slug": "graphs"
              },
              {
                "id": "239",
                "name": "Recursion & Backtracking",
                "slug": "recursion-backtracking"
              },
              {
                "id": "237",
                "name": "Strings",
                "slug": "strings"
              },
              {
                "id": "233",
                "name": "Hashing",
                "slug": "hashing"
              }
            ],
            "pattern_tags": [
              {
                "id": "206",
                "name": "BFS / Level Order",
                "slug": "bfs-level-order"
              }
            ],
            "topic": "Graphs",
            "pattern": "Shortest Path"
          }
        ]
      },
      {
        "id": 2253,
        "label": "DSU / MST",
        "slug": "dsu-mst",
        "questions": [
          {
            "id": 516,
            "label": "Disjoint Set ",
            "slug": "disjoint-set-",
            "duration": "41 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/aBxjDBC4M1U",
            "leetcode_link": null,
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/disjoint-set-union",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#disjoint-set-",
            "topic_tags": [
              {
                "id": "246",
                "name": "Graphs",
                "slug": "graphs"
              }
            ],
            "pattern_tags": [
              {
                "id": "215",
                "name": "Disjoint Set Union",
                "slug": "disjoint-set-union"
              },
              {
                "id": "210",
                "name": "Greedy Choice",
                "slug": "greedy-choice"
              }
            ],
            "topic": "Graphs",
            "pattern": "DSU / MST"
          },
          {
            "id": 517,
            "label": "Find the MST weight",
            "slug": "find-the-mst-weight",
            "duration": "31 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/mJcZjjKzeqk",
            "leetcode_link": "https://leetcode.com/problems/connecting-cities-with-minimum-cost/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/find-the-mst-weight",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#find-the-mst-weight",
            "topic_tags": [
              {
                "id": "246",
                "name": "Graphs",
                "slug": "graphs"
              }
            ],
            "pattern_tags": [
              {
                "id": "215",
                "name": "Disjoint Set Union",
                "slug": "disjoint-set-union"
              },
              {
                "id": "210",
                "name": "Greedy Choice",
                "slug": "greedy-choice"
              }
            ],
            "topic": "Graphs",
            "pattern": "DSU / MST"
          },
          {
            "id": 515,
            "label": "Number of operations to make network connected",
            "slug": "number-of-operations-to-make-network-connected",
            "duration": "14 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/FYrl7iz9_ZU",
            "leetcode_link": "https://leetcode.com/problems/number-of-operations-to-make-network-connected/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#number-of-operations-to-make-network-connected",
            "topic_tags": [
              {
                "id": "246",
                "name": "Graphs",
                "slug": "graphs"
              }
            ],
            "pattern_tags": [
              {
                "id": "215",
                "name": "Disjoint Set Union",
                "slug": "disjoint-set-union"
              }
            ],
            "topic": "Graphs",
            "pattern": "DSU / MST"
          },
          {
            "id": 514,
            "label": "Number of islands II",
            "slug": "number-of-islands-ii",
            "duration": "25 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/Rn6B-Q4SNyA",
            "leetcode_link": "https://leetcode.com/problems/number-of-islands-ii/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#number-of-islands-ii",
            "topic_tags": [
              {
                "id": "246",
                "name": "Graphs",
                "slug": "graphs"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              },
              {
                "id": "233",
                "name": "Hashing",
                "slug": "hashing"
              }
            ],
            "pattern_tags": [
              {
                "id": "215",
                "name": "Disjoint Set Union",
                "slug": "disjoint-set-union"
              }
            ],
            "topic": "Graphs",
            "pattern": "DSU / MST"
          },
          {
            "id": 512,
            "label": "Making a large island",
            "slug": "making-a-large-island",
            "duration": "26 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/lgiz0Oup6gM",
            "leetcode_link": "https://leetcode.com/problems/making-a-large-island/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/making-a-large-island",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#making-a-large-island",
            "topic_tags": [
              {
                "id": "246",
                "name": "Graphs",
                "slug": "graphs"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "215",
                "name": "Disjoint Set Union",
                "slug": "disjoint-set-union"
              }
            ],
            "topic": "Graphs",
            "pattern": "DSU / MST"
          }
        ]
      }
    ]
  },
  {
    "id": 2254,
    "label": "Dynamic Programming",
    "slug": "dynamic-programming",
    "subtopics": [
      {
        "id": 2255,
        "label": "State Transition DP",
        "slug": "state-transition-dp",
        "questions": [
          {
            "id": 289,
            "label": "Frog jump with K distances",
            "slug": "frog-jump-with-k-distances",
            "duration": "16 min",
            "difficulty": "core",
            "yt_video": "https://www.youtube.com/watch?v=Kmh3rhyEtB8",
            "leetcode_link": null,
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/frog-jump-with-k-distances",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#frog-jump-with-k-distances",
            "topic_tags": [
              {
                "id": "247",
                "name": "Dynamic Programming",
                "slug": "dynamic-programming"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "220",
                "name": "Linear DP",
                "slug": "linear-dp"
              }
            ],
            "topic": "Dynamic Programming",
            "pattern": "State Transition DP"
          },
          {
            "id": 290,
            "label": "House robber",
            "slug": "house-robber",
            "duration": "9 min",
            "difficulty": "core",
            "yt_video": "https://www.youtube.com/watch?v=3WaxQMELSkw",
            "leetcode_link": "https://leetcode.com/problems/house-robber/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/house-robber-ii",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#house-robber",
            "topic_tags": [
              {
                "id": "247",
                "name": "Dynamic Programming",
                "slug": "dynamic-programming"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "220",
                "name": "Linear DP",
                "slug": "linear-dp"
              }
            ],
            "topic": "Dynamic Programming",
            "pattern": "State Transition DP"
          },
          {
            "id": 292,
            "label": "Ninja's training",
            "slug": "ninja's-training",
            "duration": "51 min",
            "difficulty": "core",
            "yt_video": "https://www.youtube.com/watch?v=AE39gJYuRog",
            "leetcode_link": null,
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/ninjas-training",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#ninja's-training",
            "topic_tags": [
              {
                "id": "247",
                "name": "Dynamic Programming",
                "slug": "dynamic-programming"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "221",
                "name": "Multi-State DP",
                "slug": "multi-state-dp"
              }
            ],
            "topic": "Dynamic Programming",
            "pattern": "State Transition DP"
          },
          {
            "id": 300,
            "label": "Unique paths II",
            "slug": "unique-paths-ii",
            "duration": "12 min",
            "difficulty": "pro",
            "yt_video": "https://www.youtube.com/watch?v=TmhpgXScLyY",
            "leetcode_link": "https://leetcode.com/problems/unique-paths-ii/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/unique-paths-ii-obstacles",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#unique-paths-ii",
            "topic_tags": [
              {
                "id": "247",
                "name": "Dynamic Programming",
                "slug": "dynamic-programming"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "222",
                "name": "Grid DP",
                "slug": "grid-dp"
              }
            ],
            "topic": "Dynamic Programming",
            "pattern": "State Transition DP"
          },
          {
            "id": 305,
            "label": "Best time to buy and sell stock with transaction fees",
            "slug": "best-time-to-buy-and-sell-stock-with-cooldown-and-transaction-fees",
            "duration": "6 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/k4eK-vEmnKg",
            "leetcode_link": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/best-time-to-buy-and-sell-stock-with-transaction-fee",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#best-time-to-buy-and-sell-stock-with-cooldown-and-transaction-fees",
            "topic_tags": [
              {
                "id": "247",
                "name": "Dynamic Programming",
                "slug": "dynamic-programming"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "223",
                "name": "Stock Trading DP",
                "slug": "stock-trading-dp"
              }
            ],
            "topic": "Dynamic Programming",
            "pattern": "State Transition DP"
          },
          {
            "id": 304,
            "label": "Best time to buy and sell stock IV",
            "slug": "best-time-to-buy-and-sell-stock-iv",
            "duration": "12 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/IV1dHbk5CDc",
            "leetcode_link": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/best-time-to-buy-and-sell-stock-iv",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#best-time-to-buy-and-sell-stock-iv",
            "topic_tags": [
              {
                "id": "247",
                "name": "Dynamic Programming",
                "slug": "dynamic-programming"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "223",
                "name": "Stock Trading DP",
                "slug": "stock-trading-dp"
              }
            ],
            "topic": "Dynamic Programming",
            "pattern": "State Transition DP"
          }
        ]
      },
      {
        "id": 2256,
        "label": "Knapsack DP",
        "slug": "knapsack-dp",
        "questions": [
          {
            "id": 315,
            "label": "0 and 1 Knapsack",
            "slug": "0-and-1-knapsack",
            "duration": "40 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/GqOmJHQZivw",
            "leetcode_link": null,
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#0-and-1-knapsack",
            "topic_tags": [
              {
                "id": "247",
                "name": "Dynamic Programming",
                "slug": "dynamic-programming"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "224",
                "name": "Knapsack / Subset DP",
                "slug": "knapsack-subset-dp"
              }
            ],
            "topic": "Dynamic Programming",
            "pattern": "Knapsack DP"
          },
          {
            "id": 320,
            "label": "Partition a set into two subsets with minimum absolute sum difference",
            "slug": "partition-a-set-into-two-subsets-with-minimum-absolute-sum-difference",
            "duration": "29 min",
            "difficulty": "pro",
            "yt_video": "https://www.youtube.com/watch?v=GS_OqZb2CWc",
            "leetcode_link": "https://leetcode.com/problems/last-stone-weight-ii/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#partition-a-set-into-two-subsets-with-minimum-absolute-sum-difference",
            "topic_tags": [
              {
                "id": "247",
                "name": "Dynamic Programming",
                "slug": "dynamic-programming"
              }
            ],
            "pattern_tags": [
              {
                "id": "224",
                "name": "Knapsack / Subset DP",
                "slug": "knapsack-subset-dp"
              }
            ],
            "topic": "Dynamic Programming",
            "pattern": "Knapsack DP"
          },
          {
            "id": 324,
            "label": "Target sum",
            "slug": "target-sum",
            "duration": "8 min",
            "difficulty": "core",
            "yt_video": "https://www.youtube.com/watch?v=b3GD8263-PQ",
            "leetcode_link": "https://leetcode.com/problems/target-sum/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#target-sum",
            "topic_tags": [
              {
                "id": "247",
                "name": "Dynamic Programming",
                "slug": "dynamic-programming"
              },
              {
                "id": "239",
                "name": "Recursion & Backtracking",
                "slug": "recursion-backtracking"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "224",
                "name": "Knapsack / Subset DP",
                "slug": "knapsack-subset-dp"
              }
            ],
            "topic": "Dynamic Programming",
            "pattern": "Knapsack DP"
          },
          {
            "id": 316,
            "label": "Coin change II",
            "slug": "coin-change-ii",
            "duration": "22 min",
            "difficulty": "pro",
            "yt_video": "https://www.youtube.com/watch?v=HgyouUi11zk",
            "leetcode_link": "https://leetcode.com/problems/coin-change-ii/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/coin-change-ii-combinations",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#coin-change-ii",
            "topic_tags": [
              {
                "id": "247",
                "name": "Dynamic Programming",
                "slug": "dynamic-programming"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "224",
                "name": "Knapsack / Subset DP",
                "slug": "knapsack-subset-dp"
              }
            ],
            "topic": "Dynamic Programming",
            "pattern": "Knapsack DP"
          }
        ]
      },
      {
        "id": 2257,
        "label": "Sequence DP",
        "slug": "sequence-dp",
        "questions": [
          {
            "id": 308,
            "label": "Longest common subsequence",
            "slug": "longest-common-subsequence",
            "duration": "46 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/-zI4mrF2Pb4",
            "leetcode_link": "https://leetcode.com/problems/longest-common-subsequence/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#longest-common-subsequence",
            "topic_tags": [
              {
                "id": "247",
                "name": "Dynamic Programming",
                "slug": "dynamic-programming"
              },
              {
                "id": "237",
                "name": "Strings",
                "slug": "strings"
              }
            ],
            "pattern_tags": [
              {
                "id": "226",
                "name": "String DP",
                "slug": "string-dp"
              }
            ],
            "topic": "Dynamic Programming",
            "pattern": "Sequence DP"
          },
          {
            "id": 309,
            "label": "Longest common substring",
            "slug": "longest-common-substring",
            "duration": "14 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/_wP9mWNPL5w",
            "leetcode_link": null,
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#longest-common-substring",
            "topic_tags": [
              {
                "id": "247",
                "name": "Dynamic Programming",
                "slug": "dynamic-programming"
              },
              {
                "id": "237",
                "name": "Strings",
                "slug": "strings"
              }
            ],
            "pattern_tags": [
              {
                "id": "226",
                "name": "String DP",
                "slug": "string-dp"
              }
            ],
            "topic": "Dynamic Programming",
            "pattern": "Sequence DP"
          },
          {
            "id": 310,
            "label": "Longest palindromic subsequence",
            "slug": "longest-palindromic-subsequence",
            "duration": "9 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/6i_T5kkfv4A",
            "leetcode_link": "https://leetcode.com/problems/longest-palindromic-subsequence/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#longest-palindromic-subsequence",
            "topic_tags": [
              {
                "id": "247",
                "name": "Dynamic Programming",
                "slug": "dynamic-programming"
              },
              {
                "id": "237",
                "name": "Strings",
                "slug": "strings"
              }
            ],
            "pattern_tags": [
              {
                "id": "226",
                "name": "String DP",
                "slug": "string-dp"
              }
            ],
            "topic": "Dynamic Programming",
            "pattern": "Sequence DP"
          },
          {
            "id": 636,
            "label": "Longest Increasing Subsequence",
            "slug": "longest-increasing-subsequence",
            "duration": "40 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/on2hvxBXJH4",
            "leetcode_link": "https://leetcode.com/problems/longest-increasing-subsequence/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#longest-increasing-subsequence",
            "topic_tags": [
              {
                "id": "247",
                "name": "Dynamic Programming",
                "slug": "dynamic-programming"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              },
              {
                "id": "236",
                "name": "Binary Search",
                "slug": "binary-search"
              }
            ],
            "pattern_tags": [
              {
                "id": "225",
                "name": "LIS / Sequence DP",
                "slug": "lis-sequence-dp"
              },
              {
                "id": "191",
                "name": "Lower Bound / Upper Bound",
                "slug": "lower-bound-upper-bound"
              }
            ],
            "topic": "Dynamic Programming",
            "pattern": "Sequence DP"
          },
          {
            "id": 780,
            "label": "Number of Longest Increasing Subsequences",
            "slug": "number-of-longest-increasing-subsequences",
            "duration": "20 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/cKVl1TFdNXg",
            "leetcode_link": "https://leetcode.com/problems/number-of-longest-increasing-subsequence/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#number-of-longest-increasing-subsequences",
            "topic_tags": [
              {
                "id": "247",
                "name": "Dynamic Programming",
                "slug": "dynamic-programming"
              },
              {
                "id": "251",
                "name": "Advanced Range Data Structures",
                "slug": "advanced-range-data-structures"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "225",
                "name": "LIS / Sequence DP",
                "slug": "lis-sequence-dp"
              }
            ],
            "topic": "Dynamic Programming",
            "pattern": "Sequence DP"
          },
          {
            "id": 307,
            "label": "Edit distance",
            "slug": "edit-distance",
            "duration": "37 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/fJaKO8FbDdo",
            "leetcode_link": "https://leetcode.com/problems/edit-distance/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#edit-distance",
            "topic_tags": [
              {
                "id": "247",
                "name": "Dynamic Programming",
                "slug": "dynamic-programming"
              },
              {
                "id": "237",
                "name": "Strings",
                "slug": "strings"
              }
            ],
            "pattern_tags": [
              {
                "id": "226",
                "name": "String DP",
                "slug": "string-dp"
              }
            ],
            "topic": "Dynamic Programming",
            "pattern": "Sequence DP"
          },
          {
            "id": 314,
            "label": "Wildcard matching",
            "slug": "wildcard-matching",
            "duration": "43 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/ZmlQ3vgAOMo",
            "leetcode_link": "https://leetcode.com/problems/wildcard-matching/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#wildcard-matching",
            "topic_tags": [
              {
                "id": "247",
                "name": "Dynamic Programming",
                "slug": "dynamic-programming"
              },
              {
                "id": "237",
                "name": "Strings",
                "slug": "strings"
              },
              {
                "id": "239",
                "name": "Recursion & Backtracking",
                "slug": "recursion-backtracking"
              }
            ],
            "pattern_tags": [
              {
                "id": "226",
                "name": "String DP",
                "slug": "string-dp"
              }
            ],
            "topic": "Dynamic Programming",
            "pattern": "Sequence DP"
          }
        ]
      },
      {
        "id": 2258,
        "label": "Partition DP",
        "slug": "partition-dp",
        "questions": [
          {
            "id": 327,
            "label": "Matrix chain multiplication",
            "slug": "matrix-chain-multiplication",
            "duration": "61 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/vRVfmbCFW7Y",
            "leetcode_link": null,
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#matrix-chain-multiplication",
            "topic_tags": [
              {
                "id": "247",
                "name": "Dynamic Programming",
                "slug": "dynamic-programming"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "227",
                "name": "Interval / Partition DP",
                "slug": "interval-partition-dp"
              }
            ],
            "topic": "Dynamic Programming",
            "pattern": "Partition DP"
          },
          {
            "id": 329,
            "label": "Palindrome partitioning II ",
            "slug": "palindrome-partitioning-ii-",
            "duration": "22 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/_H8V5hJUGd0",
            "leetcode_link": "https://leetcode.com/problems/palindrome-partitioning-ii/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/palindrome-partitioning-ii-minimum-cuts",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#palindrome-partitioning-ii-",
            "topic_tags": [
              {
                "id": "247",
                "name": "Dynamic Programming",
                "slug": "dynamic-programming"
              },
              {
                "id": "237",
                "name": "Strings",
                "slug": "strings"
              }
            ],
            "pattern_tags": [
              {
                "id": "227",
                "name": "Interval / Partition DP",
                "slug": "interval-partition-dp"
              }
            ],
            "topic": "Dynamic Programming",
            "pattern": "Partition DP"
          }
        ]
      }
    ]
  },
  {
    "id": 2259,
    "label": "Tries",
    "slug": "tries",
    "subtopics": [
      {
        "id": 2260,
        "label": "Trie",
        "slug": "trie",
        "questions": [
          {
            "id": 1027,
            "label": "Trie Implementation and Advanced Operations",
            "slug": "trie-implementation-and-advanced-operations",
            "duration": "22 min",
            "difficulty": "core",
            "yt_video": null,
            "leetcode_link": "https://leetcode.com/problems/implement-trie-ii-prefix-tree/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2259#trie-implementation-and-advanced-operations",
            "topic_tags": [
              {
                "id": "248",
                "name": "Tries",
                "slug": "tries"
              }
            ],
            "pattern_tags": [
              {
                "id": "216",
                "name": "Prefix Matching",
                "slug": "prefix-matching"
              }
            ],
            "topic": "Tries",
            "pattern": "Trie"
          },
          {
            "id": 1023,
            "label": "Longest Word with All Prefixes",
            "slug": "longest-word-with-all-prefixes",
            "duration": "25 min",
            "difficulty": "core",
            "yt_video": "https://www.youtube.com/watch?v=AWnBa91lThI&list=PLgUwDviBIf0pcIDCZnxhv0LkHf5KzG9zp&index=3",
            "leetcode_link": "https://leetcode.com/problems/longest-word-with-all-prefixes/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2259#longest-word-with-all-prefixes",
            "topic_tags": [
              {
                "id": "248",
                "name": "Tries",
                "slug": "tries"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              },
              {
                "id": "237",
                "name": "Strings",
                "slug": "strings"
              }
            ],
            "pattern_tags": [
              {
                "id": "216",
                "name": "Prefix Matching",
                "slug": "prefix-matching"
              }
            ],
            "topic": "Tries",
            "pattern": "Trie"
          },
          {
            "id": 1026,
            "label": "Number of distinct substrings in a string",
            "slug": "number-of-distinct-substrings-in-a-string",
            "duration": "17 min",
            "difficulty": "pro",
            "yt_video": "https://www.youtube.com/watch?v=RV0QeTyHZxo&list=PLgUwDviBIf0pcIDCZnxhv0LkHf5KzG9zp&index=4",
            "leetcode_link": "https://leetcode.com/problems/number-of-distinct-substrings-in-a-string/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2259#number-of-distinct-substrings-in-a-string",
            "topic_tags": [
              {
                "id": "248",
                "name": "Tries",
                "slug": "tries"
              },
              {
                "id": "237",
                "name": "Strings",
                "slug": "strings"
              }
            ],
            "pattern_tags": [
              {
                "id": "216",
                "name": "Prefix Matching",
                "slug": "prefix-matching"
              }
            ],
            "topic": "Tries",
            "pattern": "Trie"
          },
          {
            "id": 1024,
            "label": "Maximum XOR of two numbers in an array",
            "slug": "maximum-xor-of-two-numbers-in-an-array",
            "duration": "34 min",
            "difficulty": "core",
            "yt_video": "https://www.youtube.com/watch?v=EIhAwfHubE8&list=PLgUwDviBIf0pcIDCZnxhv0LkHf5KzG9zp&index=6",
            "leetcode_link": "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2259#maximum-xor-of-two-numbers-in-an-array",
            "topic_tags": [
              {
                "id": "248",
                "name": "Tries",
                "slug": "tries"
              },
              {
                "id": "233",
                "name": "Hashing",
                "slug": "hashing"
              },
              {
                "id": "240",
                "name": "Bit Manipulation",
                "slug": "bit-manipulation"
              }
            ],
            "pattern_tags": [
              {
                "id": "198",
                "name": "Bitwise XOR",
                "slug": "bitwise-xor"
              }
            ],
            "topic": "Tries",
            "pattern": "Trie"
          },
          {
            "id": 1025,
            "label": "Maximum Xor with an element from an array",
            "slug": "maximum-xor-with-an-element-from-an-array",
            "duration": "23 min",
            "difficulty": "pro",
            "yt_video": "https://www.youtube.com/watch?v=Q8LhG9Pi5KM&list=PLgUwDviBIf0pcIDCZnxhv0LkHf5KzG9zp&index=7",
            "leetcode_link": "https://leetcode.com/problems/maximum-xor-with-an-element-from-array/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2259#maximum-xor-with-an-element-from-an-array",
            "topic_tags": [
              {
                "id": "248",
                "name": "Tries",
                "slug": "tries"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              },
              {
                "id": "240",
                "name": "Bit Manipulation",
                "slug": "bit-manipulation"
              }
            ],
            "pattern_tags": [
              {
                "id": "198",
                "name": "Bitwise XOR",
                "slug": "bitwise-xor"
              }
            ],
            "topic": "Tries",
            "pattern": "Trie"
          }
        ]
      }
    ]
  },
  {
    "id": 2261,
    "label": "Strings",
    "slug": "strings",
    "subtopics": [
      {
        "id": 2262,
        "label": "String Matching",
        "slug": "string-matching",
        "questions": [
          {
            "id": 979,
            "label": "Rabin Karp Algorithm",
            "slug": "rabin-karp-algorithm",
            "duration": "34 min",
            "difficulty": "pro",
            "yt_video": null,
            "leetcode_link": "https://leetcode.com/problems/repeated-string-match/discuss/416144/Rabin-Karp-algorithm-C%2B%2B-implementation",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2261#rabin-karp-algorithm",
            "topic_tags": [
              {
                "id": "237",
                "name": "Strings",
                "slug": "strings"
              }
            ],
            "pattern_tags": [
              {
                "id": "217",
                "name": "String Matching / Rolling Hash",
                "slug": "string-matching-rolling-hash"
              }
            ],
            "topic": "Strings",
            "pattern": "String Matching"
          },
          {
            "id": 981,
            "label": "Z function",
            "slug": "z-function",
            "duration": "35 min",
            "difficulty": "pro",
            "yt_video": null,
            "leetcode_link": null,
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2261#z-function",
            "topic_tags": [
              {
                "id": "237",
                "name": "Strings",
                "slug": "strings"
              }
            ],
            "pattern_tags": [
              {
                "id": "217",
                "name": "String Matching / Rolling Hash",
                "slug": "string-matching-rolling-hash"
              }
            ],
            "topic": "Strings",
            "pattern": "String Matching"
          },
          {
            "id": 977,
            "label": "KMP Algorithm or LPS array",
            "slug": "kmp-algorithm-or-lps-array",
            "duration": "29 min",
            "difficulty": "pro",
            "yt_video": null,
            "leetcode_link": "https://leetcode.com/problems/implement-strstr/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2261#kmp-algorithm-or-lps-array",
            "topic_tags": [
              {
                "id": "237",
                "name": "Strings",
                "slug": "strings"
              }
            ],
            "pattern_tags": [
              {
                "id": "217",
                "name": "String Matching / Rolling Hash",
                "slug": "string-matching-rolling-hash"
              }
            ],
            "topic": "Strings",
            "pattern": "String Matching"
          },
          {
            "id": 980,
            "label": "Shortest Palindrome",
            "slug": "shortest-palindrome",
            "duration": "7 min",
            "difficulty": "pro",
            "yt_video": null,
            "leetcode_link": "https://leetcode.com/problems/shortest-palindrome/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2261#shortest-palindrome",
            "topic_tags": [
              {
                "id": "237",
                "name": "Strings",
                "slug": "strings"
              },
              {
                "id": "233",
                "name": "Hashing",
                "slug": "hashing"
              }
            ],
            "pattern_tags": [
              {
                "id": "217",
                "name": "String Matching / Rolling Hash",
                "slug": "string-matching-rolling-hash"
              }
            ],
            "topic": "Strings",
            "pattern": "String Matching"
          }
        ]
      }
    ]
  },
  {
    "id": 2263,
    "label": "Bit Manipulation",
    "slug": "bit-manipulation",
    "subtopics": [
      {
        "id": 2264,
        "label": "Bit Manipulation",
        "slug": "bit-manipulation",
        "questions": [
          {
            "id": 142,
            "label": "Power Set Bit Manipulation",
            "slug": "power-set-bit-manipulation",
            "duration": "12 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/LqKaUv1G3_I?si=UXU_T5OsHiokPRvP",
            "leetcode_link": "https://leetcode.com/problems/subsets/",
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2263#power-set-bit-manipulation",
            "topic_tags": [
              {
                "id": "240",
                "name": "Bit Manipulation",
                "slug": "bit-manipulation"
              }
            ],
            "pattern_tags": [
              {
                "id": "199",
                "name": "Bitmask Enumeration",
                "slug": "bitmask-enumeration"
              }
            ],
            "topic": "Bit Manipulation",
            "pattern": "Bit Manipulation"
          },
          {
            "id": 144,
            "label": "Single Number - II",
            "slug": "single-number---ii",
            "duration": "30 min",
            "difficulty": "core",
            "yt_video": null,
            "leetcode_link": "https://leetcode.com/problems/single-number-ii/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/single-number-ii",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2263#single-number---ii",
            "topic_tags": [
              {
                "id": "240",
                "name": "Bit Manipulation",
                "slug": "bit-manipulation"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "184",
                "name": "Basic Traversal / Scan",
                "slug": "basic-traversal-scan"
              }
            ],
            "topic": "Bit Manipulation",
            "pattern": "Bit Manipulation"
          },
          {
            "id": 145,
            "label": "Single Number - III",
            "slug": "single-number---iii",
            "duration": "24 min",
            "difficulty": "pro",
            "yt_video": "https://youtu.be/UA5JnV1J2sI?si=VFBRJyb3boZvx_r1",
            "leetcode_link": "https://leetcode.com/problems/single-number-iii/",
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/single-number-iii",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2263#single-number---iii",
            "topic_tags": [
              {
                "id": "240",
                "name": "Bit Manipulation",
                "slug": "bit-manipulation"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "198",
                "name": "Bitwise XOR",
                "slug": "bitwise-xor"
              }
            ],
            "topic": "Bit Manipulation",
            "pattern": "Bit Manipulation"
          },
          {
            "id": 21,
            "label": "Find the repeating and missing number",
            "slug": "find-the-repeating-and-missing-number",
            "duration": "41 min",
            "difficulty": "core",
            "yt_video": "https://youtu.be/2D0D8HE6uak",
            "leetcode_link": null,
            "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/find-the-missing-and-repeating-numbers-in-an-array",
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2263#find-the-repeating-and-missing-number",
            "topic_tags": [
              {
                "id": "234",
                "name": "Sorting",
                "slug": "sorting"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "190",
                "name": "Sort and Scan",
                "slug": "sort-and-scan"
              }
            ],
            "topic": "Bit Manipulation",
            "pattern": "Bit Manipulation"
          }
        ]
      }
    ]
  },
  {
    "id": 2265,
    "label": "Mathematics",
    "slug": "mathematics",
    "subtopics": [
      {
        "id": 2266,
        "label": "Number Theory",
        "slug": "number-theory",
        "questions": [
          {
            "id": 653,
            "label": "Print all primes till N",
            "slug": "print-all-primes-till-n",
            "duration": "18 min",
            "difficulty": "core",
            "yt_video": null,
            "leetcode_link": null,
            "article_link": null,
            "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2265#print-all-primes-till-n",
            "topic_tags": [
              {
                "id": "232",
                "name": "Mathematics",
                "slug": "mathematics"
              },
              {
                "id": "235",
                "name": "Arrays",
                "slug": "arrays"
              }
            ],
            "pattern_tags": [
              {
                "id": "218",
                "name": "Number Theory",
                "slug": "number-theory"
              }
            ],
            "topic": "Mathematics",
            "pattern": "Number Theory"
          }
        ]
      }
    ]
  }
];

export const STRIVER_180_ALL_QUESTIONS: StriverQuestion[] = [
  {
    "id": 22,
    "label": "Majority Element-I",
    "slug": "majority-element-i",
    "duration": "17 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/nP_ns3uSh80",
    "leetcode_link": "https://leetcode.com/problems/majority-element/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/majority-element-n-by-2",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2217#majority-element-i",
    "topic_tags": [
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "184",
        "name": "Basic Traversal / Scan",
        "slug": "basic-traversal-scan"
      }
    ],
    "topic": "Arrays",
    "pattern": "Linear Scan"
  },
  {
    "id": 29,
    "label": "Kadane's Algorithm",
    "slug": "kadane's-algorithm",
    "duration": "19 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/AHZpyENo7k4",
    "leetcode_link": "https://leetcode.com/problems/maximum-subarray/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2217#kadane's-algorithm",
    "topic_tags": [
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "184",
        "name": "Basic Traversal / Scan",
        "slug": "basic-traversal-scan"
      }
    ],
    "topic": "Arrays",
    "pattern": "Linear Scan"
  },
  {
    "id": 23,
    "label": "Majority Element-II",
    "slug": "majority-element-ii",
    "duration": "25 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/vwZj1K0e9U8",
    "leetcode_link": "https://leetcode.com/problems/majority-element-ii/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/majority-element-ii-n-by-3",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2217#majority-element-ii",
    "topic_tags": [
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      },
      {
        "id": "233",
        "name": "Hashing",
        "slug": "hashing"
      }
    ],
    "pattern_tags": [
      {
        "id": "186",
        "name": "Frequency Counting",
        "slug": "frequency-counting"
      }
    ],
    "topic": "Arrays",
    "pattern": "Linear Scan"
  },
  {
    "id": 24,
    "label": "Maximum Product Subarray in an Array",
    "slug": "maximum-product-subarray-in-an-array",
    "duration": "18 min",
    "difficulty": "core",
    "yt_video": null,
    "leetcode_link": "https://leetcode.com/problems/maximum-product-subarray/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/maximum-product-subarray",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2217#maximum-product-subarray-in-an-array",
    "topic_tags": [
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "184",
        "name": "Basic Traversal / Scan",
        "slug": "basic-traversal-scan"
      }
    ],
    "topic": "Arrays",
    "pattern": "Linear Scan"
  },
  {
    "id": 36,
    "label": "Sort an array of 0's 1's and 2's",
    "slug": "sort-an-array-of-0's-1's-and-2's",
    "duration": "24 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/tp8JIuCXBaU",
    "leetcode_link": "https://leetcode.com/problems/sort-colors/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/sort-array-0s-1s-2s",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2217#sort-an-array-of-0's-1's-and-2's",
    "topic_tags": [
      {
        "id": "234",
        "name": "Sorting",
        "slug": "sorting"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "190",
        "name": "Sort and Scan",
        "slug": "sort-and-scan"
      }
    ],
    "topic": "Arrays",
    "pattern": "Two Pointers"
  },
  {
    "id": 27,
    "label": "3 Sum",
    "slug": "3-sum",
    "duration": "37 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/DhFh8Kw7ymk",
    "leetcode_link": "https://leetcode.com/problems/3sum/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/3sum",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2217#3-sum",
    "topic_tags": [
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "188",
        "name": "Two Pointer",
        "slug": "two-pointer"
      },
      {
        "id": "190",
        "name": "Sort and Scan",
        "slug": "sort-and-scan"
      }
    ],
    "topic": "Arrays",
    "pattern": "Two Pointers"
  },
  {
    "id": 31,
    "label": "Next Permutation",
    "slug": "next-permutation",
    "duration": "26 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/JDOXKqF60RQ",
    "leetcode_link": "https://leetcode.com/problems/next-permutation/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/next-permutation",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2217#next-permutation",
    "topic_tags": [
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "188",
        "name": "Two Pointer",
        "slug": "two-pointer"
      }
    ],
    "topic": "Arrays",
    "pattern": "Two Pointers"
  },
  {
    "id": 28,
    "label": "4 Sum",
    "slug": "4-sum",
    "duration": "27 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/eD95WRfh81c",
    "leetcode_link": "https://leetcode.com/problems/4sum/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/4sum",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2217#4-sum",
    "topic_tags": [
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "188",
        "name": "Two Pointer",
        "slug": "two-pointer"
      },
      {
        "id": "190",
        "name": "Sort and Scan",
        "slug": "sort-and-scan"
      }
    ],
    "topic": "Arrays",
    "pattern": "Two Pointers"
  },
  {
    "id": 25,
    "label": "Merge two sorted arrays without extra space",
    "slug": "merge-two-sorted-arrays-without-extra-space",
    "duration": "32 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/n7uwj04E0I4",
    "leetcode_link": "https://leetcode.com/problems/merge-sorted-array/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2217#merge-two-sorted-arrays-without-extra-space",
    "topic_tags": [
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "188",
        "name": "Two Pointer",
        "slug": "two-pointer"
      },
      {
        "id": "190",
        "name": "Sort and Scan",
        "slug": "sort-and-scan"
      }
    ],
    "topic": "Arrays",
    "pattern": "Two Pointers"
  },
  {
    "id": 965,
    "label": "Trapping Rainwater",
    "slug": "trapping-rainwater",
    "duration": "29 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/1_5VuquLbXg?si=NFG6df318_6OtGvg",
    "leetcode_link": "https://leetcode.com/problems/trapping-rain-water/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/trapping-rain-water",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2217#trapping-rainwater",
    "topic_tags": [
      {
        "id": "241",
        "name": "Stack & Queues",
        "slug": "stack-queues"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "202",
        "name": "Monotonic Stack / Queue",
        "slug": "monotonic-stack-queue"
      }
    ],
    "topic": "Arrays",
    "pattern": "Two Pointers"
  },
  {
    "id": 20,
    "label": "Count Inversions",
    "slug": "count-inversions",
    "duration": "23 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/AseUmwVNaoY",
    "leetcode_link": null,
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/count-inversions-in-an-array-using-merge-sort",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2217#count-inversions",
    "topic_tags": [
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "194",
        "name": "Divide and Conquer",
        "slug": "divide-and-conquer"
      }
    ],
    "topic": "Arrays",
    "pattern": "Divide and Conquer"
  },
  {
    "id": 26,
    "label": "Reverse Pairs",
    "slug": "reverse-pairs",
    "duration": "31 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/0e4bZaP3MDI",
    "leetcode_link": "https://leetcode.com/problems/reverse-pairs/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/count-reverse-pairs",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2217#reverse-pairs",
    "topic_tags": [
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "194",
        "name": "Divide and Conquer",
        "slug": "divide-and-conquer"
      }
    ],
    "topic": "Arrays",
    "pattern": "Divide and Conquer"
  },
  {
    "id": 37,
    "label": "Two Sum",
    "slug": "two-sum",
    "duration": "17 min",
    "difficulty": "basic",
    "yt_video": "https://youtu.be/UXDSeD9mN-k",
    "leetcode_link": "https://leetcode.com/problems/two-sum/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/two-sum",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2221#two-sum",
    "topic_tags": [
      {
        "id": "233",
        "name": "Hashing",
        "slug": "hashing"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "184",
        "name": "Basic Traversal / Scan",
        "slug": "basic-traversal-scan"
      }
    ],
    "topic": "Hashing",
    "pattern": "Hashing & Prefix Sums"
  },
  {
    "id": 563,
    "label": "Longest Consecutive Sequence in an Array",
    "slug": "longest-consecutive-sequence-in-an-array",
    "duration": "22 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/oO5uLE7EUlM",
    "leetcode_link": "https://leetcode.com/problems/longest-consecutive-sequence/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/longest-consecutive-sequence-in-an-array",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2221#longest-consecutive-sequence-in-an-array",
    "topic_tags": [
      {
        "id": "233",
        "name": "Hashing",
        "slug": "hashing"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      },
      {
        "id": "246",
        "name": "Graphs",
        "slug": "graphs"
      }
    ],
    "pattern_tags": [
      {
        "id": "184",
        "name": "Basic Traversal / Scan",
        "slug": "basic-traversal-scan"
      }
    ],
    "topic": "Hashing",
    "pattern": "Hashing & Prefix Sums"
  },
  {
    "id": 564,
    "label": "Longest subarray with sum K",
    "slug": "longest-subarray-with-sum-k",
    "duration": "40 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/frf7qxiN2qU",
    "leetcode_link": "https://leetcode.com/problems/maximum-size-subarray-sum-equals-k/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2221#longest-subarray-with-sum-k",
    "topic_tags": [
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      },
      {
        "id": "233",
        "name": "Hashing",
        "slug": "hashing"
      }
    ],
    "pattern_tags": [
      {
        "id": "187",
        "name": "Prefix / Precomputation",
        "slug": "prefix-precomputation"
      }
    ],
    "topic": "Hashing",
    "pattern": "Hashing & Prefix Sums"
  },
  {
    "id": 561,
    "label": "Count subarrays with given sum",
    "slug": "count-subarrays-with-given-sum",
    "duration": "22 min",
    "difficulty": "core",
    "yt_video": "https://www.youtube.com/watch?v=xvNwoz-ufXA&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=32",
    "leetcode_link": "https://leetcode.com/problems/subarray-sum-equals-k/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/count-subarrays-with-given-sum",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2221#count-subarrays-with-given-sum",
    "topic_tags": [
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      },
      {
        "id": "233",
        "name": "Hashing",
        "slug": "hashing"
      }
    ],
    "pattern_tags": [
      {
        "id": "187",
        "name": "Prefix / Precomputation",
        "slug": "prefix-precomputation"
      }
    ],
    "topic": "Hashing",
    "pattern": "Hashing & Prefix Sums"
  },
  {
    "id": 562,
    "label": "Count subarrays with given xor K",
    "slug": "count-subarrays-with-given-xor-k",
    "duration": "23 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/eZr-6p0B7ME",
    "leetcode_link": null,
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/count-subarrays-with-a-given-xor-k",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2221#count-subarrays-with-given-xor-k",
    "topic_tags": [
      {
        "id": "240",
        "name": "Bit Manipulation",
        "slug": "bit-manipulation"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "198",
        "name": "Bitwise XOR",
        "slug": "bitwise-xor"
      }
    ],
    "topic": "Hashing",
    "pattern": "Hashing & Prefix Sums"
  },
  {
    "id": 75,
    "label": "Find peak element",
    "slug": "find-peak-element",
    "duration": "32 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/cXxmbemS6XM",
    "leetcode_link": "https://leetcode.com/problems/find-peak-element/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/find-a-peak-element-in-an-array",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2223#find-peak-element",
    "topic_tags": [
      {
        "id": "236",
        "name": "Binary Search",
        "slug": "binary-search"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "191",
        "name": "Lower Bound / Upper Bound",
        "slug": "lower-bound-upper-bound"
      }
    ],
    "topic": "Binary Search",
    "pattern": "Binary Search"
  },
  {
    "id": 83,
    "label": "Find minimum in Rotated Sorted Array",
    "slug": "find-minimum-in-rotated-sorted-array",
    "duration": "15 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/nhEMDKMB44g",
    "leetcode_link": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/find-minimum-in-rotated-sorted-array",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2223#find-minimum-in-rotated-sorted-array",
    "topic_tags": [
      {
        "id": "236",
        "name": "Binary Search",
        "slug": "binary-search"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "192",
        "name": "Rotated Array Search",
        "slug": "rotated-array-search"
      }
    ],
    "topic": "Binary Search",
    "pattern": "Binary Search"
  },
  {
    "id": 88,
    "label": "Search in rotated sorted array-II",
    "slug": "search-in-rotated-sorted-array-2",
    "duration": "12 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/w2G2W8l__pc",
    "leetcode_link": "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/search-in-rotated-sorted-array-ii",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2223#search-in-rotated-sorted-array-2",
    "topic_tags": [
      {
        "id": "236",
        "name": "Binary Search",
        "slug": "binary-search"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "192",
        "name": "Rotated Array Search",
        "slug": "rotated-array-search"
      }
    ],
    "topic": "Binary Search",
    "pattern": "Binary Search"
  },
  {
    "id": 90,
    "label": "Single element in sorted array",
    "slug": "single-element-in-sorted-array",
    "duration": "22 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/AZOmHuHadxQ",
    "leetcode_link": "https://leetcode.com/problems/single-element-in-a-sorted-array/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/single-element-in-a-sorted-array",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2223#single-element-in-sorted-array",
    "topic_tags": [
      {
        "id": "236",
        "name": "Binary Search",
        "slug": "binary-search"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "191",
        "name": "Lower Bound / Upper Bound",
        "slug": "lower-bound-upper-bound"
      }
    ],
    "topic": "Binary Search",
    "pattern": "Binary Search"
  },
  {
    "id": 68,
    "label": "Search in 2D matrix - II",
    "slug": "search-in-2d-matrix-ii",
    "duration": "15 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/9ZbB397jU4k",
    "leetcode_link": "https://leetcode.com/problems/search-a-2d-matrix-ii/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/search-in-a-row-and-column-wise-sorted-matrix",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2223#search-in-2d-matrix-ii",
    "topic_tags": [
      {
        "id": "236",
        "name": "Binary Search",
        "slug": "binary-search"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "191",
        "name": "Lower Bound / Upper Bound",
        "slug": "lower-bound-upper-bound"
      }
    ],
    "topic": "Binary Search",
    "pattern": "Binary Search"
  },
  {
    "id": 65,
    "label": "Find Peak Element - II",
    "slug": "find-peak-element-ii",
    "duration": "20 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/nGGp5XBzC4g?si=WCop5C6Azj5gAELH",
    "leetcode_link": "https://leetcode.com/problems/find-a-peak-element-ii/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/find-peak-element-2d-matrix",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2223#find-peak-element-ii",
    "topic_tags": [
      {
        "id": "236",
        "name": "Binary Search",
        "slug": "binary-search"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "191",
        "name": "Lower Bound / Upper Bound",
        "slug": "lower-bound-upper-bound"
      }
    ],
    "topic": "Binary Search",
    "pattern": "Binary Search"
  },
  {
    "id": 91,
    "label": "Find Nth root of a number",
    "slug": "find-nth-root-of-a-number",
    "duration": "20 min",
    "difficulty": "core",
    "yt_video": "https://www.youtube.com/watch?v=WjpswYrS2nY&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=62",
    "leetcode_link": null,
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2223#find-nth-root-of-a-number",
    "topic_tags": [
      {
        "id": "236",
        "name": "Binary Search",
        "slug": "binary-search"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "193",
        "name": "Search on Answer",
        "slug": "search-on-answer"
      }
    ],
    "topic": "Binary Search",
    "pattern": "Search on Answer"
  },
  {
    "id": 94,
    "label": "Koko eating bananas",
    "slug": "koko-eating-bananas",
    "duration": "20 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/qyfekrNni90",
    "leetcode_link": "https://leetcode.com/problems/koko-eating-bananas/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/koko-eating-bananas",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2223#koko-eating-bananas",
    "topic_tags": [
      {
        "id": "236",
        "name": "Binary Search",
        "slug": "binary-search"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "193",
        "name": "Search on Answer",
        "slug": "search-on-answer"
      }
    ],
    "topic": "Binary Search",
    "pattern": "Search on Answer"
  },
  {
    "id": 73,
    "label": "Aggressive Cows",
    "slug": "aggressive-cows",
    "duration": "26 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/R_Mfw4ew-Vo",
    "leetcode_link": null,
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/aggressive-cows",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2223#aggressive-cows",
    "topic_tags": [
      {
        "id": "236",
        "name": "Binary Search",
        "slug": "binary-search"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "193",
        "name": "Search on Answer",
        "slug": "search-on-answer"
      }
    ],
    "topic": "Binary Search",
    "pattern": "Search on Answer"
  },
  {
    "id": 74,
    "label": "Book Allocation Problem",
    "slug": "book-allocation-problem",
    "duration": "27 min",
    "difficulty": "pro",
    "yt_video": "https://www.youtube.com/watch?v=gYmWHvRHu-s&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=69",
    "leetcode_link": "https://leetcode.com/problems/split-array-largest-sum/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/book-allocation-problem",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2223#book-allocation-problem",
    "topic_tags": [
      {
        "id": "236",
        "name": "Binary Search",
        "slug": "binary-search"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "193",
        "name": "Search on Answer",
        "slug": "search-on-answer"
      }
    ],
    "topic": "Binary Search",
    "pattern": "Search on Answer"
  },
  {
    "id": 67,
    "label": "Matrix Median",
    "slug": "matrix-median",
    "duration": "23 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/Q9wXgdxJq48?si=ScI_0uzJh7yg8nrX",
    "leetcode_link": "https://leetcode.com/problems/median-of-a-row-wise-sorted-matrix/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/median-of-a-row-wise-sorted-matrix",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2223#matrix-median",
    "topic_tags": [
      {
        "id": "236",
        "name": "Binary Search",
        "slug": "binary-search"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "191",
        "name": "Lower Bound / Upper Bound",
        "slug": "lower-bound-upper-bound"
      }
    ],
    "topic": "Binary Search",
    "pattern": "Search on Answer"
  },
  {
    "id": 76,
    "label": "Kth element of 2 sorted arrays",
    "slug": "kth-element-of-2-sorted-arrays",
    "duration": "10 min",
    "difficulty": "pro",
    "yt_video": "https://www.youtube.com/watch?v=nv7F4PiLUzo&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=66",
    "leetcode_link": null,
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/kth-element-of-two-sorted-arrays",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2223#kth-element-of-2-sorted-arrays",
    "topic_tags": [
      {
        "id": "236",
        "name": "Binary Search",
        "slug": "binary-search"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "191",
        "name": "Lower Bound / Upper Bound",
        "slug": "lower-bound-upper-bound"
      }
    ],
    "topic": "Binary Search",
    "pattern": "Partition Search"
  },
  {
    "id": 77,
    "label": "Median of 2 sorted arrays",
    "slug": "median-of-2-sorted-arrays",
    "duration": "50 min",
    "difficulty": "pro",
    "yt_video": "https://www.youtube.com/watch?v=NTop3VTjmxk&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=65",
    "leetcode_link": "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/median-of-2-sorted-arrays",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2223#median-of-2-sorted-arrays",
    "topic_tags": [
      {
        "id": "236",
        "name": "Binary Search",
        "slug": "binary-search"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "191",
        "name": "Lower Bound / Upper Bound",
        "slug": "lower-bound-upper-bound"
      }
    ],
    "topic": "Binary Search",
    "pattern": "Partition Search"
  },
  {
    "id": 929,
    "label": "Longest Substring Without Repeating Characters",
    "slug": "longest-substring-without-repeating-characters",
    "duration": "22 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/-zSxTJkcdAo?si=I2zfR-vlDMg0zU9z",
    "leetcode_link": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/longest-substring-without-repeating-characters",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2227#longest-substring-without-repeating-characters",
    "topic_tags": [
      {
        "id": "237",
        "name": "Strings",
        "slug": "strings"
      },
      {
        "id": "233",
        "name": "Hashing",
        "slug": "hashing"
      }
    ],
    "pattern_tags": [
      {
        "id": "189",
        "name": "Sliding Window",
        "slug": "sliding-window"
      }
    ],
    "topic": "Sliding Window and Two Pointers",
    "pattern": "Sliding Window"
  },
  {
    "id": 922,
    "label": "Maximum Points You Can Obtain from Cards ",
    "slug": "maximum-points-you-can-obtain-from-cards-",
    "duration": "11 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/pBWCOCS636U?si=-X64rY67noxvOwrG",
    "leetcode_link": "https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/maximum-points-you-can-obtain-from-cards",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2227#maximum-points-you-can-obtain-from-cards-",
    "topic_tags": [
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "189",
        "name": "Sliding Window",
        "slug": "sliding-window"
      }
    ],
    "topic": "Sliding Window and Two Pointers",
    "pattern": "Sliding Window"
  },
  {
    "id": 930,
    "label": " Max Consecutive Ones III",
    "slug": "max-consecutive-ones-iii",
    "duration": "29 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/3E4JBHSLpYk?si=SoOW64pP6otEKxBw",
    "leetcode_link": "https://leetcode.com/problems/max-consecutive-ones-iii/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/max-consecutive-ones-iii",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2227#max-consecutive-ones-iii",
    "topic_tags": [
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "189",
        "name": "Sliding Window",
        "slug": "sliding-window"
      }
    ],
    "topic": "Sliding Window and Two Pointers",
    "pattern": "Sliding Window"
  },
  {
    "id": 927,
    "label": "Longest Repeating Character Replacement",
    "slug": "longest-repeating-character-replacement",
    "duration": "25 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/_eNhaDCr6P0?si=pBWcEjozF5poom0p",
    "leetcode_link": "https://leetcode.com/problems/longest-repeating-character-replacement/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/longest-repeating-character-replacement",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2227#longest-repeating-character-replacement",
    "topic_tags": [
      {
        "id": "237",
        "name": "Strings",
        "slug": "strings"
      },
      {
        "id": "233",
        "name": "Hashing",
        "slug": "hashing"
      }
    ],
    "pattern_tags": [
      {
        "id": "189",
        "name": "Sliding Window",
        "slug": "sliding-window"
      }
    ],
    "topic": "Sliding Window and Two Pointers",
    "pattern": "Sliding Window"
  },
  {
    "id": 928,
    "label": "Longest Substring With At Most K Distinct Characters",
    "slug": "longest-substring-with-at-most-k-distinct-characters",
    "duration": "21 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/teM9ZsVRQyc?si=Kh0_u6aCkkBU3Q33",
    "leetcode_link": "https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/longest-substring-with-at-most-k-distinct-characters",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2227#longest-substring-with-at-most-k-distinct-characters",
    "topic_tags": [
      {
        "id": "237",
        "name": "Strings",
        "slug": "strings"
      },
      {
        "id": "233",
        "name": "Hashing",
        "slug": "hashing"
      }
    ],
    "pattern_tags": [
      {
        "id": "189",
        "name": "Sliding Window",
        "slug": "sliding-window"
      }
    ],
    "topic": "Sliding Window and Two Pointers",
    "pattern": "Sliding Window"
  },
  {
    "id": 931,
    "label": "Minimum Window Substring ",
    "slug": "minimum-window-substring-",
    "duration": "26 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/WJaij9ffOIY?si=-xnsWIH84zWU0ICd",
    "leetcode_link": "https://leetcode.com/problems/minimum-window-substring/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/minimum-window-substring",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2227#minimum-window-substring-",
    "topic_tags": [
      {
        "id": "237",
        "name": "Strings",
        "slug": "strings"
      },
      {
        "id": "233",
        "name": "Hashing",
        "slug": "hashing"
      }
    ],
    "pattern_tags": [
      {
        "id": "189",
        "name": "Sliding Window",
        "slug": "sliding-window"
      }
    ],
    "topic": "Sliding Window and Two Pointers",
    "pattern": "Sliding Window"
  },
  {
    "id": 925,
    "label": "Number of Substrings Containing All Three Characters",
    "slug": "number-of-substrings-containing-all-three-characters",
    "duration": "19 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/xtqN4qlgr8s?si=kuaLHVOLXhh5Z2tW",
    "leetcode_link": "https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/count-substrings-containing-all-three-characters-a-b-and-c",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2227#number-of-substrings-containing-all-three-characters",
    "topic_tags": [
      {
        "id": "237",
        "name": "Strings",
        "slug": "strings"
      },
      {
        "id": "233",
        "name": "Hashing",
        "slug": "hashing"
      }
    ],
    "pattern_tags": [
      {
        "id": "189",
        "name": "Sliding Window",
        "slug": "sliding-window"
      }
    ],
    "topic": "Sliding Window and Two Pointers",
    "pattern": "Counting Windows"
  },
  {
    "id": 923,
    "label": "Binary Subarrays With Sum",
    "slug": "binary-subarrays-with-sum",
    "duration": "20 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/XnMdNUkX6VM?si=Nyt8EveeLUg8lmty",
    "leetcode_link": "https://leetcode.com/problems/binary-subarrays-with-sum/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/binary-subarrays-with-sum",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2227#binary-subarrays-with-sum",
    "topic_tags": [
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      },
      {
        "id": "233",
        "name": "Hashing",
        "slug": "hashing"
      }
    ],
    "pattern_tags": [
      {
        "id": "189",
        "name": "Sliding Window",
        "slug": "sliding-window"
      }
    ],
    "topic": "Sliding Window and Two Pointers",
    "pattern": "Counting Windows"
  },
  {
    "id": 924,
    "label": "Count number of Nice subarrays",
    "slug": "count-number-of-nice-subarrays",
    "duration": "4 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/j_QOv9OT9Og?si=Oq5-5hyFkzVSOZpP",
    "leetcode_link": "https://leetcode.com/problems/count-number-of-nice-subarrays/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/count-nice-subarrays",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2227#count-number-of-nice-subarrays",
    "topic_tags": [
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      },
      {
        "id": "233",
        "name": "Hashing",
        "slug": "hashing"
      },
      {
        "id": "232",
        "name": "Mathematics",
        "slug": "mathematics"
      }
    ],
    "pattern_tags": [
      {
        "id": "189",
        "name": "Sliding Window",
        "slug": "sliding-window"
      }
    ],
    "topic": "Sliding Window and Two Pointers",
    "pattern": "Counting Windows"
  },
  {
    "id": 878,
    "label": "Power Set",
    "slug": "power-set",
    "duration": "20 min",
    "difficulty": "core",
    "yt_video": "https://www.youtube.com/watch?v=b7AYbpM5YrE&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=67",
    "leetcode_link": "https://leetcode.com/problems/subsets/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2230#power-set",
    "topic_tags": [
      {
        "id": "239",
        "name": "Recursion & Backtracking",
        "slug": "recursion-backtracking"
      }
    ],
    "pattern_tags": [
      {
        "id": "195",
        "name": "Subsets",
        "slug": "subsets"
      }
    ],
    "topic": "Recursion and Backtracking",
    "pattern": "Subsets & Combinations"
  },
  {
    "id": 876,
    "label": "Generate Parentheses",
    "slug": "generate-parentheses",
    "duration": "22 min",
    "difficulty": "core",
    "yt_video": null,
    "leetcode_link": "https://leetcode.com/problems/generate-parentheses/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2230#generate-parentheses",
    "topic_tags": [
      {
        "id": "239",
        "name": "Recursion & Backtracking",
        "slug": "recursion-backtracking"
      },
      {
        "id": "247",
        "name": "Dynamic Programming",
        "slug": "dynamic-programming"
      },
      {
        "id": "237",
        "name": "Strings",
        "slug": "strings"
      }
    ],
    "pattern_tags": [
      {
        "id": "196",
        "name": "Permutations & Combinations",
        "slug": "permutations-combinations"
      }
    ],
    "topic": "Recursion and Backtracking",
    "pattern": "Subsets & Combinations"
  },
  {
    "id": 875,
    "label": "Letter Combinations of a Phone Number",
    "slug": "letter-combinations-of-a-phone-number",
    "duration": "12 min",
    "difficulty": "pro",
    "yt_video": null,
    "leetcode_link": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2230#letter-combinations-of-a-phone-number",
    "topic_tags": [
      {
        "id": "239",
        "name": "Recursion & Backtracking",
        "slug": "recursion-backtracking"
      },
      {
        "id": "237",
        "name": "Strings",
        "slug": "strings"
      },
      {
        "id": "233",
        "name": "Hashing",
        "slug": "hashing"
      }
    ],
    "pattern_tags": [
      {
        "id": "196",
        "name": "Permutations & Combinations",
        "slug": "permutations-combinations"
      }
    ],
    "topic": "Recursion and Backtracking",
    "pattern": "Subsets & Combinations"
  },
  {
    "id": 864,
    "label": "Combination Sum",
    "slug": "combination-sum",
    "duration": "16 min",
    "difficulty": "core",
    "yt_video": "https://www.youtube.com/watch?v=OyZFFqQtu98&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=49",
    "leetcode_link": "https://leetcode.com/problems/combination-sum/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2230#combination-sum",
    "topic_tags": [
      {
        "id": "239",
        "name": "Recursion & Backtracking",
        "slug": "recursion-backtracking"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "196",
        "name": "Permutations & Combinations",
        "slug": "permutations-combinations"
      }
    ],
    "topic": "Recursion and Backtracking",
    "pattern": "Subsets & Combinations"
  },
  {
    "id": 865,
    "label": "Combination Sum II",
    "slug": "combination-sum-ii",
    "duration": "15 min",
    "difficulty": "core",
    "yt_video": "https://www.youtube.com/watch?v=G1fRTGRxXU8&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=50",
    "leetcode_link": "https://leetcode.com/problems/combination-sum-ii/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2230#combination-sum-ii",
    "topic_tags": [
      {
        "id": "239",
        "name": "Recursion & Backtracking",
        "slug": "recursion-backtracking"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "196",
        "name": "Permutations & Combinations",
        "slug": "permutations-combinations"
      }
    ],
    "topic": "Recursion and Backtracking",
    "pattern": "Subsets & Combinations"
  },
  {
    "id": 868,
    "label": "Subsets II",
    "slug": "subsets-ii",
    "duration": "21 min",
    "difficulty": "core",
    "yt_video": "https://www.youtube.com/watch?v=RIn3gOkbhQE&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=53",
    "leetcode_link": "https://leetcode.com/problems/subsets-ii/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2230#subsets-ii",
    "topic_tags": [
      {
        "id": "239",
        "name": "Recursion & Backtracking",
        "slug": "recursion-backtracking"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      },
      {
        "id": "240",
        "name": "Bit Manipulation",
        "slug": "bit-manipulation"
      }
    ],
    "pattern_tags": [
      {
        "id": "195",
        "name": "Subsets",
        "slug": "subsets"
      }
    ],
    "topic": "Recursion and Backtracking",
    "pattern": "Subsets & Combinations"
  },
  {
    "id": 871,
    "label": "Palindrome partitioning",
    "slug": "palindrome-partitioning",
    "duration": "18 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/_H8V5hJUGd0",
    "leetcode_link": "https://leetcode.com/problems/palindrome-partitioning/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2230#palindrome-partitioning",
    "topic_tags": [
      {
        "id": "239",
        "name": "Recursion & Backtracking",
        "slug": "recursion-backtracking"
      },
      {
        "id": "247",
        "name": "Dynamic Programming",
        "slug": "dynamic-programming"
      },
      {
        "id": "237",
        "name": "Strings",
        "slug": "strings"
      }
    ],
    "pattern_tags": [
      {
        "id": "196",
        "name": "Permutations & Combinations",
        "slug": "permutations-combinations"
      }
    ],
    "topic": "Recursion and Backtracking",
    "pattern": "Subsets & Combinations"
  },
  {
    "id": 874,
    "label": "Word Search",
    "slug": "word-search",
    "duration": "19 min",
    "difficulty": "pro",
    "yt_video": null,
    "leetcode_link": "https://leetcode.com/problems/word-search/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2230#word-search",
    "topic_tags": [
      {
        "id": "239",
        "name": "Recursion & Backtracking",
        "slug": "recursion-backtracking"
      },
      {
        "id": "237",
        "name": "Strings",
        "slug": "strings"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "197",
        "name": "Constraint Satisfaction",
        "slug": "constraint-satisfaction"
      }
    ],
    "topic": "Recursion and Backtracking",
    "pattern": "Backtracking"
  },
  {
    "id": 870,
    "label": "N Queen",
    "slug": "n-queen",
    "duration": "24 min",
    "difficulty": "pro",
    "yt_video": "https://www.youtube.com/watch?v=i05Ju7AftcM&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=57",
    "leetcode_link": "https://leetcode.com/problems/n-queens/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2230#n-queen",
    "topic_tags": [
      {
        "id": "239",
        "name": "Recursion & Backtracking",
        "slug": "recursion-backtracking"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "197",
        "name": "Constraint Satisfaction",
        "slug": "constraint-satisfaction"
      }
    ],
    "topic": "Recursion and Backtracking",
    "pattern": "Backtracking"
  },
  {
    "id": 873,
    "label": "Sudoku Solver",
    "slug": "sudoko-solver",
    "duration": "31 min",
    "difficulty": "pro",
    "yt_video": "https://www.youtube.com/watch?v=FWAIf_EVUKE&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=58",
    "leetcode_link": "https://leetcode.com/problems/sudoku-solver/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2230#sudoko-solver",
    "topic_tags": [
      {
        "id": "239",
        "name": "Recursion & Backtracking",
        "slug": "recursion-backtracking"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      },
      {
        "id": "233",
        "name": "Hashing",
        "slug": "hashing"
      }
    ],
    "pattern_tags": [
      {
        "id": "197",
        "name": "Constraint Satisfaction",
        "slug": "constraint-satisfaction"
      }
    ],
    "topic": "Recursion and Backtracking",
    "pattern": "Backtracking"
  },
  {
    "id": 448,
    "label": "Find Middle of Linked List",
    "slug": "find-middle-of-linked-list",
    "duration": "14 min",
    "difficulty": "basic",
    "yt_video": "https://youtu.be/7LjQ57RqgEc?si=ir_rRDio38rhamU_",
    "leetcode_link": "https://leetcode.com/problems/middle-of-the-linked-list/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/find-middle-of-linked-list",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2233#find-middle-of-linked-list",
    "topic_tags": [
      {
        "id": "238",
        "name": "Linked List",
        "slug": "linked-list"
      }
    ],
    "pattern_tags": [
      {
        "id": "203",
        "name": "Fast & Slow Pointers",
        "slug": "fast-slow-pointers"
      }
    ],
    "topic": "Linked List",
    "pattern": "Fast & Slow Pointers"
  },
  {
    "id": 621,
    "label": "Find the intersection point of Y LL",
    "slug": "find-the-intersection-point-of-y-ll",
    "duration": "32 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/0DYoPz2Tpt4?si=L-uJs5yXUxj4VJM2",
    "leetcode_link": "https://leetcode.com/problems/intersection-of-two-linked-lists/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/intersection-of-two-linked-lists",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2233#find-the-intersection-point-of-y-ll",
    "topic_tags": [
      {
        "id": "238",
        "name": "Linked List",
        "slug": "linked-list"
      }
    ],
    "pattern_tags": [
      {
        "id": "188",
        "name": "Two Pointer",
        "slug": "two-pointer"
      }
    ],
    "topic": "Linked List",
    "pattern": "Fast & Slow Pointers"
  },
  {
    "id": 618,
    "label": "Check if LL is palindrome or not",
    "slug": "check-if-ll-is-palindrome-or-not",
    "duration": "20 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/lRY_G-u_8jk?si=BpM8hRYvXSYyjl-G",
    "leetcode_link": "https://leetcode.com/problems/palindrome-linked-list/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/check-if-a-linked-list-is-a-palindrome",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2233#check-if-ll-is-palindrome-or-not",
    "topic_tags": [
      {
        "id": "238",
        "name": "Linked List",
        "slug": "linked-list"
      }
    ],
    "pattern_tags": [
      {
        "id": "203",
        "name": "Fast & Slow Pointers",
        "slug": "fast-slow-pointers"
      },
      {
        "id": "204",
        "name": "In-place Reversal",
        "slug": "in-place-reversal"
      }
    ],
    "topic": "Linked List",
    "pattern": "Fast & Slow Pointers"
  },
  {
    "id": 620,
    "label": "Detect a loop in LL",
    "slug": "detect-a-loop-in-ll",
    "duration": "20 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/wiOo4DC5GGA?si=zagt6O6tFXc4_3cx",
    "leetcode_link": "https://leetcode.com/problems/linked-list-cycle/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/detect-cycle-linked-list",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2233#detect-a-loop-in-ll",
    "topic_tags": [
      {
        "id": "238",
        "name": "Linked List",
        "slug": "linked-list"
      }
    ],
    "pattern_tags": [
      {
        "id": "203",
        "name": "Fast & Slow Pointers",
        "slug": "fast-slow-pointers"
      }
    ],
    "topic": "Linked List",
    "pattern": "Fast & Slow Pointers"
  },
  {
    "id": 626,
    "label": "Remove Nth node from the back of the LL",
    "slug": "remove-nth-node-from-the-back-of-the-ll",
    "duration": "16 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/3kMKYQ2wNIU?si=DtFDnPU7z9HMz_GM",
    "leetcode_link": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/remove-the-nth-node-from-the-end-of-a-linked-list",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2233#remove-nth-node-from-the-back-of-the-ll",
    "topic_tags": [
      {
        "id": "238",
        "name": "Linked List",
        "slug": "linked-list"
      }
    ],
    "pattern_tags": [
      {
        "id": "188",
        "name": "Two Pointer",
        "slug": "two-pointer"
      }
    ],
    "topic": "Linked List",
    "pattern": "Fast & Slow Pointers"
  },
  {
    "id": 622,
    "label": "Find the starting point in LL",
    "slug": "find-the-starting-point-in-ll",
    "duration": "21 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/2Kd0KKmmHFc?si=7UreDPRjRvapeVB0",
    "leetcode_link": "https://leetcode.com/problems/linked-list-cycle-ii/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/find-start-of-cycle-linked-list",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2233#find-the-starting-point-in-ll",
    "topic_tags": [
      {
        "id": "238",
        "name": "Linked List",
        "slug": "linked-list"
      }
    ],
    "pattern_tags": [
      {
        "id": "203",
        "name": "Fast & Slow Pointers",
        "slug": "fast-slow-pointers"
      }
    ],
    "topic": "Linked List",
    "pattern": "Fast & Slow Pointers"
  },
  {
    "id": 623,
    "label": "Length of loop in LL",
    "slug": "length-of-loop-in-ll",
    "duration": "14 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/I4g1qbkTPus?si=ONktpqewvx57T8pF",
    "leetcode_link": null,
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/length-of-cycle-linked-list",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2233#length-of-loop-in-ll",
    "topic_tags": [
      {
        "id": "238",
        "name": "Linked List",
        "slug": "linked-list"
      }
    ],
    "pattern_tags": [
      {
        "id": "203",
        "name": "Fast & Slow Pointers",
        "slug": "fast-slow-pointers"
      }
    ],
    "topic": "Linked List",
    "pattern": "Fast & Slow Pointers"
  },
  {
    "id": 627,
    "label": "Reverse a LL",
    "slug": "reverse-a-ll",
    "duration": "32 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/D2vI2DNJGd8?si=RCaLSx01qR21IBdh",
    "leetcode_link": "https://leetcode.com/problems/reverse-linked-list/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/reverse-a-singly-linked-list",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2233#reverse-a-ll",
    "topic_tags": [
      {
        "id": "238",
        "name": "Linked List",
        "slug": "linked-list"
      }
    ],
    "pattern_tags": [
      {
        "id": "204",
        "name": "In-place Reversal",
        "slug": "in-place-reversal"
      }
    ],
    "topic": "Linked List",
    "pattern": "Reversal & Rewiring"
  },
  {
    "id": 613,
    "label": "Merge two Sorted Lists ",
    "slug": "merge-sorted-lists-",
    "duration": "18 min",
    "difficulty": "core",
    "yt_video": "https://www.youtube.com/watch?v=Xb4slcp1U38&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=29",
    "leetcode_link": "https://leetcode.com/problems/merge-two-sorted-lists/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/merge-two-sorted-linked-lists",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2233#merge-sorted-lists-",
    "topic_tags": [
      {
        "id": "238",
        "name": "Linked List",
        "slug": "linked-list"
      },
      {
        "id": "239",
        "name": "Recursion & Backtracking",
        "slug": "recursion-backtracking"
      }
    ],
    "pattern_tags": [
      {
        "id": "188",
        "name": "Two Pointer",
        "slug": "two-pointer"
      }
    ],
    "topic": "Linked List",
    "pattern": "Reversal & Rewiring"
  },
  {
    "id": 629,
    "label": "Sort a Linked List of 0's 1's and 2's",
    "slug": "sort-a-ll-of-0's-1's-and-2's",
    "duration": "22 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/gRII7LhdJWc?si=l3qRC7w3NhY7OAqw",
    "leetcode_link": null,
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/sort-linked-list-0s-1s-2s-changing-links",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2233#sort-a-ll-of-0's-1's-and-2's",
    "topic_tags": [
      {
        "id": "238",
        "name": "Linked List",
        "slug": "linked-list"
      }
    ],
    "pattern_tags": [
      {
        "id": "186",
        "name": "Frequency Counting",
        "slug": "frequency-counting"
      }
    ],
    "topic": "Linked List",
    "pattern": "Reversal & Rewiring"
  },
  {
    "id": 625,
    "label": "Add two numbers in Linked List",
    "slug": "add-two-numbers-in-ll",
    "duration": "14 min",
    "difficulty": "core",
    "yt_video": "https://www.youtube.com/watch?v=LBVsXSMOIk4&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=32",
    "leetcode_link": "https://leetcode.com/problems/add-two-numbers/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/add-two-numbers-linked-lists-reverse-order",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2233#add-two-numbers-in-ll",
    "topic_tags": [
      {
        "id": "238",
        "name": "Linked List",
        "slug": "linked-list"
      }
    ],
    "pattern_tags": [
      {
        "id": "185",
        "name": "Simulation / Implementation",
        "slug": "simulation-implementation"
      }
    ],
    "topic": "Linked List",
    "pattern": "Reversal & Rewiring"
  },
  {
    "id": 615,
    "label": "Rotate a LL",
    "slug": "rotate-a-ll",
    "duration": "12 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/uT7YI7XbTY8?si=ZaChW3a68c_v54Is",
    "leetcode_link": "https://leetcode.com/problems/rotate-list/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/rotate-linked-list-right-k-places",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2233#rotate-a-ll",
    "topic_tags": [
      {
        "id": "238",
        "name": "Linked List",
        "slug": "linked-list"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "188",
        "name": "Two Pointer",
        "slug": "two-pointer"
      }
    ],
    "topic": "Linked List",
    "pattern": "Reversal & Rewiring"
  },
  {
    "id": 616,
    "label": "Sort LL",
    "slug": "sort-ll",
    "duration": "22 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/8ocB7a_c-Cc?si=Gv-Y8q8-WyARoV35",
    "leetcode_link": "https://leetcode.com/problems/sort-list/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/sort-a-linked-list-using-merge-sort",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2233#sort-ll",
    "topic_tags": [
      {
        "id": "238",
        "name": "Linked List",
        "slug": "linked-list"
      }
    ],
    "pattern_tags": [
      {
        "id": "194",
        "name": "Divide and Conquer",
        "slug": "divide-and-conquer"
      }
    ],
    "topic": "Linked List",
    "pattern": "Reversal & Rewiring"
  },
  {
    "id": 611,
    "label": "Clone a LL with random and next pointer",
    "slug": "clone-a-ll-with-random-and-next-pointer",
    "duration": "33 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/q570bKdrnlw?si=epZtpWvtNwuTf23o",
    "leetcode_link": "https://leetcode.com/problems/copy-list-with-random-pointer/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/clone-linked-list-random-pointer",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2233#clone-a-ll-with-random-and-next-pointer",
    "topic_tags": [
      {
        "id": "238",
        "name": "Linked List",
        "slug": "linked-list"
      }
    ],
    "pattern_tags": [
      {
        "id": "185",
        "name": "Simulation / Implementation",
        "slug": "simulation-implementation"
      }
    ],
    "topic": "Linked List",
    "pattern": "Reversal & Rewiring"
  },
  {
    "id": 614,
    "label": "Reverse LL in group of given size K",
    "slug": "reverse-ll-in-group-of-given-size-k",
    "duration": "24 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/lIar1skcQYI?si=_jFghHKX4eaK36a1",
    "leetcode_link": "https://leetcode.com/problems/reverse-nodes-in-k-group/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/reverse-linked-list-k-groups",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2233#reverse-ll-in-group-of-given-size-k",
    "topic_tags": [
      {
        "id": "238",
        "name": "Linked List",
        "slug": "linked-list"
      }
    ],
    "pattern_tags": [
      {
        "id": "204",
        "name": "In-place Reversal",
        "slug": "in-place-reversal"
      }
    ],
    "topic": "Linked List",
    "pattern": "Reversal & Rewiring"
  },
  {
    "id": 612,
    "label": "Flattening of LL",
    "slug": "flattening-of-ll",
    "duration": "33 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/ykelywHJWLg?si=InMg9MmTHzY22NSR",
    "leetcode_link": "https://leetcode.com/problems/merge-k-sorted-lists/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/flatten-linked-list",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2233#flattening-of-ll",
    "topic_tags": [
      {
        "id": "238",
        "name": "Linked List",
        "slug": "linked-list"
      }
    ],
    "pattern_tags": [
      {
        "id": "209",
        "name": "K-way Merge",
        "slug": "k-way-merge"
      }
    ],
    "topic": "Linked List",
    "pattern": "Reversal & Rewiring"
  },
  {
    "id": 968,
    "label": "Next Greater Element",
    "slug": "next-greater-element",
    "duration": "18 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/e7XQLtOQM3I?si=QdcHpTtx6gAHsext",
    "leetcode_link": "https://leetcode.com/problems/next-greater-element-i/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2236#next-greater-element",
    "topic_tags": [
      {
        "id": "241",
        "name": "Stack & Queues",
        "slug": "stack-queues"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "202",
        "name": "Monotonic Stack / Queue",
        "slug": "monotonic-stack-queue"
      }
    ],
    "topic": "Stack and Queues",
    "pattern": "Monotonic Stack / Queue"
  },
  {
    "id": 969,
    "label": "Next Greater Element - 2",
    "slug": "next-greater-element---2",
    "duration": "15 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/7PrncD7v9YQ?si=UkBc7eVy9HGlBpeW",
    "leetcode_link": "https://leetcode.com/problems/next-greater-element-ii/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2236#next-greater-element---2",
    "topic_tags": [
      {
        "id": "241",
        "name": "Stack & Queues",
        "slug": "stack-queues"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "202",
        "name": "Monotonic Stack / Queue",
        "slug": "monotonic-stack-queue"
      }
    ],
    "topic": "Stack and Queues",
    "pattern": "Monotonic Stack / Queue"
  },
  {
    "id": 964,
    "label": "Stock span problem",
    "slug": "stock-span-problem",
    "duration": "19 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/eay-zoSRkVc?si=deNNe5i38BOAntha",
    "leetcode_link": "https://leetcode.com/problems/online-stock-span/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/stock-span-problem",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2236#stock-span-problem",
    "topic_tags": [
      {
        "id": "241",
        "name": "Stack & Queues",
        "slug": "stack-queues"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "202",
        "name": "Monotonic Stack / Queue",
        "slug": "monotonic-stack-queue"
      }
    ],
    "topic": "Stack and Queues",
    "pattern": "Monotonic Stack / Queue"
  },
  {
    "id": 971,
    "label": "Sum of Subarray Minimums",
    "slug": "sum-of-subarray-minimums",
    "duration": "23 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/v0e8p9JCgRc?si=XAU7ekECgS5nboRw",
    "leetcode_link": "https://leetcode.com/problems/sum-of-subarray-minimums/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2236#sum-of-subarray-minimums",
    "topic_tags": [
      {
        "id": "241",
        "name": "Stack & Queues",
        "slug": "stack-queues"
      },
      {
        "id": "247",
        "name": "Dynamic Programming",
        "slug": "dynamic-programming"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "202",
        "name": "Monotonic Stack / Queue",
        "slug": "monotonic-stack-queue"
      }
    ],
    "topic": "Stack and Queues",
    "pattern": "Monotonic Stack / Queue"
  },
  {
    "id": 972,
    "label": "Sum of Subarray Ranges",
    "slug": "sum-of-subarray-ranges",
    "duration": "10 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/gIrMptNPf5M?si=Q_GHuBvzZVs27X_U",
    "leetcode_link": "https://leetcode.com/problems/sum-of-subarray-ranges/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2236#sum-of-subarray-ranges",
    "topic_tags": [
      {
        "id": "241",
        "name": "Stack & Queues",
        "slug": "stack-queues"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "202",
        "name": "Monotonic Stack / Queue",
        "slug": "monotonic-stack-queue"
      }
    ],
    "topic": "Stack and Queues",
    "pattern": "Monotonic Stack / Queue"
  },
  {
    "id": 970,
    "label": "Remove K Digits",
    "slug": "remove-k-digits",
    "duration": "15 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/jmbuRzYPGrg?si=WN387gwQ7aXWkUao",
    "leetcode_link": "https://leetcode.com/problems/remove-k-digits/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2236#remove-k-digits",
    "topic_tags": [
      {
        "id": "241",
        "name": "Stack & Queues",
        "slug": "stack-queues"
      },
      {
        "id": "237",
        "name": "Strings",
        "slug": "strings"
      }
    ],
    "pattern_tags": [
      {
        "id": "202",
        "name": "Monotonic Stack / Queue",
        "slug": "monotonic-stack-queue"
      }
    ],
    "topic": "Stack and Queues",
    "pattern": "Monotonic Stack / Queue"
  },
  {
    "id": 963,
    "label": "Sliding Window Maximum",
    "slug": "sliding-window-maximum",
    "duration": "20 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/NwBvene4Imo?si=eU1PY-bcQfk5wdog",
    "leetcode_link": "https://leetcode.com/problems/sliding-window-maximum/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2236#sliding-window-maximum",
    "topic_tags": [
      {
        "id": "241",
        "name": "Stack & Queues",
        "slug": "stack-queues"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      },
      {
        "id": "242",
        "name": "Heaps",
        "slug": "heaps"
      }
    ],
    "pattern_tags": [
      {
        "id": "202",
        "name": "Monotonic Stack / Queue",
        "slug": "monotonic-stack-queue"
      }
    ],
    "topic": "Stack and Queues",
    "pattern": "Monotonic Stack / Queue"
  },
  {
    "id": 959,
    "label": "Largest rectangle in a histogram",
    "slug": "largest-rectangle-in-a-histogram",
    "duration": "31 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/Bzat9vgD0fs?si=DiBlLejXcr6EJoyB",
    "leetcode_link": "https://leetcode.com/problems/largest-rectangle-in-histogram/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/largest-rectangle-in-histogram",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2236#largest-rectangle-in-a-histogram",
    "topic_tags": [
      {
        "id": "241",
        "name": "Stack & Queues",
        "slug": "stack-queues"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "202",
        "name": "Monotonic Stack / Queue",
        "slug": "monotonic-stack-queue"
      }
    ],
    "topic": "Stack and Queues",
    "pattern": "Monotonic Stack / Queue"
  },
  {
    "id": 962,
    "label": "Maximum Rectangles",
    "slug": "maximum-rectangles",
    "duration": "12 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/tOylVCugy9k",
    "leetcode_link": "https://leetcode.com/problems/maximal-rectangle/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2236#maximum-rectangles",
    "topic_tags": [
      {
        "id": "241",
        "name": "Stack & Queues",
        "slug": "stack-queues"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "202",
        "name": "Monotonic Stack / Queue",
        "slug": "monotonic-stack-queue"
      }
    ],
    "topic": "Stack and Queues",
    "pattern": "Monotonic Stack / Queue"
  },
  {
    "id": 958,
    "label": "Implement Min Stack",
    "slug": "implement-min-stack",
    "duration": "21 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/NdDIaH91P0g?si=4_Jbsq5trFvfSdUY",
    "leetcode_link": "https://leetcode.com/problems/min-stack/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2236#implement-min-stack",
    "topic_tags": [
      {
        "id": "241",
        "name": "Stack & Queues",
        "slug": "stack-queues"
      }
    ],
    "pattern_tags": [
      {
        "id": "185",
        "name": "Simulation / Implementation",
        "slug": "simulation-implementation"
      }
    ],
    "topic": "Stack and Queues",
    "pattern": "Data Structure Design"
  },
  {
    "id": 967,
    "label": "Asteroid Collision",
    "slug": "asteroid-collision",
    "duration": "17 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/_eYGqw_VDR4?si=YyxibcHq800RqgIQ",
    "leetcode_link": "https://leetcode.com/problems/asteroid-collision/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/asteroid-collision",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2236#asteroid-collision",
    "topic_tags": [
      {
        "id": "241",
        "name": "Stack & Queues",
        "slug": "stack-queues"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "185",
        "name": "Simulation / Implementation",
        "slug": "simulation-implementation"
      }
    ],
    "topic": "Stack and Queues",
    "pattern": "Data Structure Design"
  },
  {
    "id": 957,
    "label": "Celebrity Problem",
    "slug": "celebrity-problem",
    "duration": "16 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/cEadsbTeze4?si=olXYfOs7l-SEn2zl",
    "leetcode_link": "https://leetcode.com/problems/find-the-celebrity/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2236#celebrity-problem",
    "topic_tags": [
      {
        "id": "241",
        "name": "Stack & Queues",
        "slug": "stack-queues"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "185",
        "name": "Simulation / Implementation",
        "slug": "simulation-implementation"
      }
    ],
    "topic": "Stack and Queues",
    "pattern": "Data Structure Design"
  },
  {
    "id": 961,
    "label": "LRU Cache",
    "slug": "lru-cache",
    "duration": "25 min",
    "difficulty": "pro",
    "yt_video": "https://www.youtube.com/watch?v=z9bJUPxzFOw",
    "leetcode_link": "https://leetcode.com/problems/lru-cache/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2236#lru-cache",
    "topic_tags": [
      {
        "id": "238",
        "name": "Linked List",
        "slug": "linked-list"
      },
      {
        "id": "233",
        "name": "Hashing",
        "slug": "hashing"
      }
    ],
    "pattern_tags": [
      {
        "id": "185",
        "name": "Simulation / Implementation",
        "slug": "simulation-implementation"
      }
    ],
    "topic": "Stack and Queues",
    "pattern": "Data Structure Design"
  },
  {
    "id": 960,
    "label": "LFU Cache",
    "slug": "lfu-cache",
    "duration": null,
    "difficulty": "pro",
    "yt_video": "https://www.youtube.com/watch?v=0PSB9y8ehbk&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=79",
    "leetcode_link": "https://leetcode.com/problems/lfu-cache/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2236#lfu-cache",
    "topic_tags": [
      {
        "id": "238",
        "name": "Linked List",
        "slug": "linked-list"
      },
      {
        "id": "233",
        "name": "Hashing",
        "slug": "hashing"
      }
    ],
    "pattern_tags": [
      {
        "id": "185",
        "name": "Simulation / Implementation",
        "slug": "simulation-implementation"
      }
    ],
    "topic": "Stack and Queues",
    "pattern": "Data Structure Design"
  },
  {
    "id": 542,
    "label": "Jump Game - I",
    "slug": "jump-game---i",
    "duration": "10 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/tZAa_jJ3SwQ?si=voKd7n9VTLDRRNzJ",
    "leetcode_link": "https://leetcode.com/problems/jump-game/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/jump-game",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2239#jump-game---i",
    "topic_tags": [
      {
        "id": "243",
        "name": "Greedy Algorithms",
        "slug": "greedy-algorithms"
      },
      {
        "id": "247",
        "name": "Dynamic Programming",
        "slug": "dynamic-programming"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "210",
        "name": "Greedy Choice",
        "slug": "greedy-choice"
      }
    ],
    "topic": "Greedy Algorithms",
    "pattern": "Greedy"
  },
  {
    "id": 545,
    "label": "Valid Paranthesis Checker",
    "slug": "valid-paranthesis-checker",
    "duration": "25 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/cHT6sG_hUZI?si=XRHeyh7jOaLaTy3g",
    "leetcode_link": "https://leetcode.com/problems/valid-parenthesis-string/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2239#valid-paranthesis-checker",
    "topic_tags": [
      {
        "id": "243",
        "name": "Greedy Algorithms",
        "slug": "greedy-algorithms"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "210",
        "name": "Greedy Choice",
        "slug": "greedy-choice"
      }
    ],
    "topic": "Greedy Algorithms",
    "pattern": "Greedy"
  },
  {
    "id": 544,
    "label": "Candy",
    "slug": "candy",
    "duration": "30 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/IIqVFvKE6RY?si=EjmuXZJNLQLUkEd7",
    "leetcode_link": "https://leetcode.com/problems/candy/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/candy-distribution-problem",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2239#candy",
    "topic_tags": [
      {
        "id": "243",
        "name": "Greedy Algorithms",
        "slug": "greedy-algorithms"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "210",
        "name": "Greedy Choice",
        "slug": "greedy-choice"
      }
    ],
    "topic": "Greedy Algorithms",
    "pattern": "Greedy"
  },
  {
    "id": 549,
    "label": "N meetings in one room",
    "slug": "n-meetings-in-one-room",
    "duration": "13 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/mKfhTotEguk?si=2RELeq18mpmIIN3Q",
    "leetcode_link": null,
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/n-meetings-in-one-room",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2239#n-meetings-in-one-room",
    "topic_tags": [
      {
        "id": "243",
        "name": "Greedy Algorithms",
        "slug": "greedy-algorithms"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "211",
        "name": "Intervals / Scheduling",
        "slug": "intervals-scheduling"
      }
    ],
    "topic": "Greedy Algorithms",
    "pattern": "Intervals & Scheduling"
  },
  {
    "id": 546,
    "label": "Insert Interval",
    "slug": "insert-interval",
    "duration": "13 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/xxRE-46OCC8?si=a7aPuIw16zDx2lAa",
    "leetcode_link": "https://leetcode.com/problems/insert-interval/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/insert-interval",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2239#insert-interval",
    "topic_tags": [
      {
        "id": "243",
        "name": "Greedy Algorithms",
        "slug": "greedy-algorithms"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "211",
        "name": "Intervals / Scheduling",
        "slug": "intervals-scheduling"
      }
    ],
    "topic": "Greedy Algorithms",
    "pattern": "Intervals & Scheduling"
  },
  {
    "id": 550,
    "label": "Non-overlapping Intervals",
    "slug": "non-overlapping-intervals",
    "duration": "8 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/HDHQ8lAWakY?si=JVtLqboGdpUTOVjf",
    "leetcode_link": "https://leetcode.com/problems/non-overlapping-intervals/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/non-overlapping-intervals",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2239#non-overlapping-intervals",
    "topic_tags": [
      {
        "id": "243",
        "name": "Greedy Algorithms",
        "slug": "greedy-algorithms"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "211",
        "name": "Intervals / Scheduling",
        "slug": "intervals-scheduling"
      },
      {
        "id": "190",
        "name": "Sort and Scan",
        "slug": "sort-and-scan"
      }
    ],
    "topic": "Greedy Algorithms",
    "pattern": "Intervals & Scheduling"
  },
  {
    "id": 548,
    "label": "Minimum number of platforms required for a railway",
    "slug": "minimum-number-of-platforms-required-for-a-railway",
    "duration": "18 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/AsGzwR_FWok?si=165acXU_dtqOHuo9",
    "leetcode_link": "https://leetcode.com/problems/divide-intervals-into-minimum-number-of-groups/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/minimum-platforms-required-for-a-railway-station",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2239#minimum-number-of-platforms-required-for-a-railway",
    "topic_tags": [
      {
        "id": "243",
        "name": "Greedy Algorithms",
        "slug": "greedy-algorithms"
      },
      {
        "id": "232",
        "name": "Mathematics",
        "slug": "mathematics"
      }
    ],
    "pattern_tags": [
      {
        "id": "211",
        "name": "Intervals / Scheduling",
        "slug": "intervals-scheduling"
      }
    ],
    "topic": "Greedy Algorithms",
    "pattern": "Intervals & Scheduling"
  },
  {
    "id": 547,
    "label": "Job sequencing Problem",
    "slug": "job-sequencing-problem",
    "duration": "16 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/QbwltemZbRg?si=wvcemJ5BLPlTRmkG",
    "leetcode_link": null,
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/job-sequencing-problem",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2239#job-sequencing-problem",
    "topic_tags": [
      {
        "id": "243",
        "name": "Greedy Algorithms",
        "slug": "greedy-algorithms"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "210",
        "name": "Greedy Choice",
        "slug": "greedy-choice"
      }
    ],
    "topic": "Greedy Algorithms",
    "pattern": "Intervals & Scheduling"
  },
  {
    "id": 573,
    "label": "Heapify Algorithm",
    "slug": "heapify-algorithm",
    "duration": "23 min",
    "difficulty": "core",
    "yt_video": null,
    "leetcode_link": null,
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2242#heapify-algorithm",
    "topic_tags": [
      {
        "id": "242",
        "name": "Heaps",
        "slug": "heaps"
      }
    ],
    "pattern_tags": [
      {
        "id": "185",
        "name": "Simulation / Implementation",
        "slug": "simulation-implementation"
      }
    ],
    "topic": "Heaps",
    "pattern": "Heap / Priority Queue"
  },
  {
    "id": 570,
    "label": "Build heap from a given Array",
    "slug": "build-heap-from-a-given-array",
    "duration": "15 min",
    "difficulty": "core",
    "yt_video": null,
    "leetcode_link": null,
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2242#build-heap-from-a-given-array",
    "topic_tags": [
      {
        "id": "242",
        "name": "Heaps",
        "slug": "heaps"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "185",
        "name": "Simulation / Implementation",
        "slug": "simulation-implementation"
      }
    ],
    "topic": "Heaps",
    "pattern": "Heap / Priority Queue"
  },
  {
    "id": 576,
    "label": "Implement Min Heap",
    "slug": "implement-min-heap",
    "duration": "12 min",
    "difficulty": "core",
    "yt_video": null,
    "leetcode_link": null,
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2242#implement-min-heap",
    "topic_tags": [
      {
        "id": "242",
        "name": "Heaps",
        "slug": "heaps"
      }
    ],
    "pattern_tags": [
      {
        "id": "185",
        "name": "Simulation / Implementation",
        "slug": "simulation-implementation"
      }
    ],
    "topic": "Heaps",
    "pattern": "Heap / Priority Queue"
  },
  {
    "id": 578,
    "label": "K-th Largest element in an array",
    "slug": "k-th-largest-element-in-an-array",
    "duration": "44 min",
    "difficulty": "pro",
    "yt_video": null,
    "leetcode_link": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/k-th-largest-element-in-an-array",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2242#k-th-largest-element-in-an-array",
    "topic_tags": [
      {
        "id": "242",
        "name": "Heaps",
        "slug": "heaps"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "207",
        "name": "Top K Elements",
        "slug": "top-k-elements"
      },
      {
        "id": "219",
        "name": "Priority Queue",
        "slug": "priority-queue"
      }
    ],
    "topic": "Heaps",
    "pattern": "Heap / Priority Queue"
  },
  {
    "id": 566,
    "label": "Find Median from Data Stream",
    "slug": "find-median-from-data-stream",
    "duration": null,
    "difficulty": "pro",
    "yt_video": null,
    "leetcode_link": "https://leetcode.com/problems/find-median-from-data-stream/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/find-median-data-stream",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2242#find-median-from-data-stream",
    "topic_tags": [
      {
        "id": "242",
        "name": "Heaps",
        "slug": "heaps"
      }
    ],
    "pattern_tags": [
      {
        "id": "208",
        "name": "Two Heaps",
        "slug": "two-heaps"
      },
      {
        "id": "219",
        "name": "Priority Queue",
        "slug": "priority-queue"
      }
    ],
    "topic": "Heaps",
    "pattern": "Heap / Priority Queue"
  },
  {
    "id": 134,
    "label": "Level Order Traversal",
    "slug": "level-order-traversal",
    "duration": "8 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/EoAsWbO7sqg",
    "leetcode_link": "https://leetcode.com/problems/binary-tree-level-order-traversal/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/binary-tree-level-order-traversal",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2244#level-order-traversal",
    "topic_tags": [
      {
        "id": "244",
        "name": "Binary Trees",
        "slug": "binary-trees"
      }
    ],
    "pattern_tags": [
      {
        "id": "206",
        "name": "BFS / Level Order",
        "slug": "bfs-level-order"
      }
    ],
    "topic": "Binary Trees",
    "pattern": "BFS"
  },
  {
    "id": 119,
    "label": "Maximum Width of BT",
    "slug": "maximum-width-of-bt",
    "duration": "21 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/ZbybYvcVLks",
    "leetcode_link": "https://leetcode.com/problems/maximum-width-of-binary-tree/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2244#maximum-width-of-bt",
    "topic_tags": [
      {
        "id": "244",
        "name": "Binary Trees",
        "slug": "binary-trees"
      }
    ],
    "pattern_tags": [
      {
        "id": "206",
        "name": "BFS / Level Order",
        "slug": "bfs-level-order"
      }
    ],
    "topic": "Binary Trees",
    "pattern": "BFS"
  },
  {
    "id": 123,
    "label": "Right/Left View of BT",
    "slug": "right-left-view-of-bt",
    "duration": "12 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/KV4mRzTjlAk",
    "leetcode_link": "https://leetcode.com/problems/binary-tree-right-side-view/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/left-and-right-views-of-a-binary-tree",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2244#right-left-view-of-bt",
    "topic_tags": [
      {
        "id": "244",
        "name": "Binary Trees",
        "slug": "binary-trees"
      }
    ],
    "pattern_tags": [
      {
        "id": "206",
        "name": "BFS / Level Order",
        "slug": "bfs-level-order"
      }
    ],
    "topic": "Binary Trees",
    "pattern": "BFS"
  },
  {
    "id": 124,
    "label": "Top View of BT",
    "slug": "top-view-of-bt",
    "duration": "9 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/Et9OCDNvJ78",
    "leetcode_link": null,
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/top-view-of-binary-tree",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2244#top-view-of-bt",
    "topic_tags": [
      {
        "id": "244",
        "name": "Binary Trees",
        "slug": "binary-trees"
      }
    ],
    "pattern_tags": [
      {
        "id": "206",
        "name": "BFS / Level Order",
        "slug": "bfs-level-order"
      }
    ],
    "topic": "Binary Trees",
    "pattern": "BFS"
  },
  {
    "id": 121,
    "label": "Print all nodes at a distance of K in BT",
    "slug": "print-all-nodes-at-a-distance-of-k-in-bt",
    "duration": "16 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/i9ORlEy6EsI",
    "leetcode_link": "https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/nodes-distance-k-binary-tree",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2244#print-all-nodes-at-a-distance-of-k-in-bt",
    "topic_tags": [
      {
        "id": "244",
        "name": "Binary Trees",
        "slug": "binary-trees"
      }
    ],
    "pattern_tags": [
      {
        "id": "205",
        "name": "Tree DFS / Recursive Decomposition",
        "slug": "tree-dfs-recursive-decomposition"
      }
    ],
    "topic": "Binary Trees",
    "pattern": "BFS"
  },
  {
    "id": 120,
    "label": "Minimum time taken to burn the BT from a given Node",
    "slug": "minimum-time-taken-to-burn-the-bt-from-a-given-node",
    "duration": "17 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/2r5wLmQfD6g",
    "leetcode_link": null,
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/minimum-time-burn-binary-tree",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2244#minimum-time-taken-to-burn-the-bt-from-a-given-node",
    "topic_tags": [
      {
        "id": "244",
        "name": "Binary Trees",
        "slug": "binary-trees"
      }
    ],
    "pattern_tags": [
      {
        "id": "205",
        "name": "Tree DFS / Recursive Decomposition",
        "slug": "tree-dfs-recursive-decomposition"
      }
    ],
    "topic": "Binary Trees",
    "pattern": "BFS"
  },
  {
    "id": 125,
    "label": "Vertical Order Traversal",
    "slug": "vertical-order-traversal",
    "duration": "18 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/q_a6lpbKJdw",
    "leetcode_link": "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/vertical-order-traversal-of-a-binary-tree",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2244#vertical-order-traversal",
    "topic_tags": [
      {
        "id": "244",
        "name": "Binary Trees",
        "slug": "binary-trees"
      }
    ],
    "pattern_tags": [
      {
        "id": "206",
        "name": "BFS / Level Order",
        "slug": "bfs-level-order"
      }
    ],
    "topic": "Binary Trees",
    "pattern": "BFS"
  },
  {
    "id": 122,
    "label": "Print root to leaf path in BT",
    "slug": "print-root-to-leaf-path-in-bt",
    "duration": "10 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/fmflMqVOC7k",
    "leetcode_link": null,
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/print-root-to-leaf-path-in-binary-tree",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2244#print-root-to-leaf-path-in-bt",
    "topic_tags": [
      {
        "id": "244",
        "name": "Binary Trees",
        "slug": "binary-trees"
      }
    ],
    "pattern_tags": [
      {
        "id": "205",
        "name": "Tree DFS / Recursive Decomposition",
        "slug": "tree-dfs-recursive-decomposition"
      }
    ],
    "topic": "Binary Trees",
    "pattern": "DFS / Tree DP"
  },
  {
    "id": 130,
    "label": "Diameter of Binary Tree",
    "slug": "diameter-of-binary-tree",
    "duration": "13 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/Rezetez59Nk",
    "leetcode_link": "https://leetcode.com/problems/diameter-of-binary-tree/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/diameter-of-a-binary-tree",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2244#diameter-of-binary-tree",
    "topic_tags": [
      {
        "id": "244",
        "name": "Binary Trees",
        "slug": "binary-trees"
      }
    ],
    "pattern_tags": [
      {
        "id": "205",
        "name": "Tree DFS / Recursive Decomposition",
        "slug": "tree-dfs-recursive-decomposition"
      }
    ],
    "topic": "Binary Trees",
    "pattern": "DFS / Tree DP"
  },
  {
    "id": 118,
    "label": "LCA in BT",
    "slug": "lca-in-bt",
    "duration": "13 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/_-QHfMDde90",
    "leetcode_link": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/lowest-common-ancestor-in-a-binary-tree",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2244#lca-in-bt",
    "topic_tags": [
      {
        "id": "244",
        "name": "Binary Trees",
        "slug": "binary-trees"
      }
    ],
    "pattern_tags": [
      {
        "id": "205",
        "name": "Tree DFS / Recursive Decomposition",
        "slug": "tree-dfs-recursive-decomposition"
      }
    ],
    "topic": "Binary Trees",
    "pattern": "DFS / Tree DP"
  },
  {
    "id": 116,
    "label": "Boundary Traversal",
    "slug": "boundary-traversal",
    "duration": "9 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/0ca1nvR0be4",
    "leetcode_link": "https://leetcode.com/problems/boundary-of-binary-tree/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/boundary-traversal-of-a-binary-tree",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2244#boundary-traversal",
    "topic_tags": [
      {
        "id": "244",
        "name": "Binary Trees",
        "slug": "binary-trees"
      }
    ],
    "pattern_tags": [
      {
        "id": "205",
        "name": "Tree DFS / Recursive Decomposition",
        "slug": "tree-dfs-recursive-decomposition"
      }
    ],
    "topic": "Binary Trees",
    "pattern": "DFS / Tree DP"
  },
  {
    "id": 110,
    "label": "Construct a BT from Preorder and Inorder",
    "slug": "construct-a-bt-from-preorder-and-inorder",
    "duration": "18 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/aZNaLrVebKQ",
    "leetcode_link": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/construct-a-binary-tree-from-preorder-and-inorder",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2244#construct-a-bt-from-preorder-and-inorder",
    "topic_tags": [
      {
        "id": "244",
        "name": "Binary Trees",
        "slug": "binary-trees"
      },
      {
        "id": "233",
        "name": "Hashing",
        "slug": "hashing"
      }
    ],
    "pattern_tags": [
      {
        "id": "205",
        "name": "Tree DFS / Recursive Decomposition",
        "slug": "tree-dfs-recursive-decomposition"
      }
    ],
    "topic": "Binary Trees",
    "pattern": "DFS / Tree DP"
  },
  {
    "id": 139,
    "label": "Morris Inorder Traversal ",
    "slug": "morris-inorder-traversal-",
    "duration": "19 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/80Zug6D1_r4",
    "leetcode_link": "https://leetcode.com/problems/binary-tree-inorder-traversal/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/morris-inorder-traversal",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2244#morris-inorder-traversal-",
    "topic_tags": [
      {
        "id": "244",
        "name": "Binary Trees",
        "slug": "binary-trees"
      }
    ],
    "pattern_tags": [
      {
        "id": "205",
        "name": "Tree DFS / Recursive Decomposition",
        "slug": "tree-dfs-recursive-decomposition"
      }
    ],
    "topic": "Binary Trees",
    "pattern": "DFS / Tree DP"
  },
  {
    "id": 132,
    "label": "Maximum path sum ",
    "slug": "maximum-path-sum-",
    "duration": "17 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/WszrfSwMz58",
    "leetcode_link": "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/binary-tree-maximum-path-sum",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2244#maximum-path-sum-",
    "topic_tags": [
      {
        "id": "244",
        "name": "Binary Trees",
        "slug": "binary-trees"
      }
    ],
    "pattern_tags": [
      {
        "id": "205",
        "name": "Tree DFS / Recursive Decomposition",
        "slug": "tree-dfs-recursive-decomposition"
      }
    ],
    "topic": "Binary Trees",
    "pattern": "DFS / Tree DP"
  },
  {
    "id": 112,
    "label": "Serialize and De-serialize BT",
    "slug": "serialize-and-de-serialize-bt",
    "duration": "16 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/-YbXySKJsX8",
    "leetcode_link": "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/serialize-and-deserialize-a-binary-tree",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2244#serialize-and-de-serialize-bt",
    "topic_tags": [
      {
        "id": "244",
        "name": "Binary Trees",
        "slug": "binary-trees"
      }
    ],
    "pattern_tags": [
      {
        "id": "205",
        "name": "Tree DFS / Recursive Decomposition",
        "slug": "tree-dfs-recursive-decomposition"
      }
    ],
    "topic": "Binary Trees",
    "pattern": "DFS / Tree DP"
  },
  {
    "id": 104,
    "label": "Insert a given node in BST",
    "slug": "insert-a-given-node-in-bst",
    "duration": "7 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/FiFiNvM29ps",
    "leetcode_link": "https://leetcode.com/problems/insert-into-a-binary-search-tree/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/insert-into-a-binary-search-tree",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2247#insert-a-given-node-in-bst",
    "topic_tags": [
      {
        "id": "245",
        "name": "Binary Search Trees",
        "slug": "binary-search-trees"
      }
    ],
    "pattern_tags": [
      {
        "id": "191",
        "name": "Lower Bound / Upper Bound",
        "slug": "lower-bound-upper-bound"
      }
    ],
    "topic": "Binary Search Trees",
    "pattern": "Inorder Traversal"
  },
  {
    "id": 106,
    "label": "LCA in BST",
    "slug": "lca-in-bst",
    "duration": "8 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/cX_kPV_foZc",
    "leetcode_link": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/lowest-common-ancestor-of-a-binary-search-tree",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2247#lca-in-bst",
    "topic_tags": [
      {
        "id": "245",
        "name": "Binary Search Trees",
        "slug": "binary-search-trees"
      }
    ],
    "pattern_tags": [
      {
        "id": "205",
        "name": "Tree DFS / Recursive Decomposition",
        "slug": "tree-dfs-recursive-decomposition"
      }
    ],
    "topic": "Binary Search Trees",
    "pattern": "Inorder Traversal"
  },
  {
    "id": 102,
    "label": "Delete a node in BST",
    "slug": "delete-a-node-in-bst",
    "duration": "15 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/kouxiP_H5WE",
    "leetcode_link": "https://leetcode.com/problems/delete-node-in-a-bst/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/delete-node-in-a-bst",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2247#delete-a-node-in-bst",
    "topic_tags": [
      {
        "id": "245",
        "name": "Binary Search Trees",
        "slug": "binary-search-trees"
      }
    ],
    "pattern_tags": [
      {
        "id": "191",
        "name": "Lower Bound / Upper Bound",
        "slug": "lower-bound-upper-bound"
      }
    ],
    "topic": "Binary Search Trees",
    "pattern": "Inorder Traversal"
  },
  {
    "id": 103,
    "label": "Inorder successor and predecessor in BST",
    "slug": "inorder-successor-and-predecessor-in-bst",
    "duration": "10 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/SXKAD2svfmI",
    "leetcode_link": "https://leetcode.com/problems/inorder-successor-in-bst/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/inorder-successor-and-predecessor-in-a-bst",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2247#inorder-successor-and-predecessor-in-bst",
    "topic_tags": [
      {
        "id": "245",
        "name": "Binary Search Trees",
        "slug": "binary-search-trees"
      }
    ],
    "pattern_tags": [
      {
        "id": "191",
        "name": "Lower Bound / Upper Bound",
        "slug": "lower-bound-upper-bound"
      }
    ],
    "topic": "Binary Search Trees",
    "pattern": "Inorder Traversal"
  },
  {
    "id": 105,
    "label": "Kth Smallest and Largest element in BST",
    "slug": "kth-smallest-and-largest-element-in-bst",
    "duration": "8 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/9TJYWh0adfk",
    "leetcode_link": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/kth-smallest-and-largest-elements-in-a-bst",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2247#kth-smallest-and-largest-element-in-bst",
    "topic_tags": [
      {
        "id": "245",
        "name": "Binary Search Trees",
        "slug": "binary-search-trees"
      }
    ],
    "pattern_tags": [
      {
        "id": "205",
        "name": "Tree DFS / Recursive Decomposition",
        "slug": "tree-dfs-recursive-decomposition"
      }
    ],
    "topic": "Binary Search Trees",
    "pattern": "Inorder Traversal"
  },
  {
    "id": 100,
    "label": "Check if a tree is a BST or not",
    "slug": "check-if-a-tree-is-a-bst-or-not",
    "duration": "9 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/f-sj7I5oXEI",
    "leetcode_link": "https://leetcode.com/problems/validate-binary-search-tree/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/validate-binary-search-tree",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2247#check-if-a-tree-is-a-bst-or-not",
    "topic_tags": [
      {
        "id": "245",
        "name": "Binary Search Trees",
        "slug": "binary-search-trees"
      },
      {
        "id": "244",
        "name": "Binary Trees",
        "slug": "binary-trees"
      }
    ],
    "pattern_tags": [
      {
        "id": "205",
        "name": "Tree DFS / Recursive Decomposition",
        "slug": "tree-dfs-recursive-decomposition"
      }
    ],
    "topic": "Binary Search Trees",
    "pattern": "Inorder Traversal"
  },
  {
    "id": 101,
    "label": "Construct a BST from a preorder traversal",
    "slug": "construct-a-bst-from-a-preorder-traversal",
    "duration": "16 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/UmJT3j26t1I",
    "leetcode_link": "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/construct-a-bst-from-preorder-traversal",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2247#construct-a-bst-from-a-preorder-traversal",
    "topic_tags": [
      {
        "id": "245",
        "name": "Binary Search Trees",
        "slug": "binary-search-trees"
      }
    ],
    "pattern_tags": [
      {
        "id": "205",
        "name": "Tree DFS / Recursive Decomposition",
        "slug": "tree-dfs-recursive-decomposition"
      }
    ],
    "topic": "Binary Search Trees",
    "pattern": "Inorder Traversal"
  },
  {
    "id": 99,
    "label": "Two sum in BST",
    "slug": "two-sum-in-bst",
    "duration": "14 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/ssL3sHwPeb4",
    "leetcode_link": "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/two-sum-in-bst",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2247#two-sum-in-bst",
    "topic_tags": [
      {
        "id": "245",
        "name": "Binary Search Trees",
        "slug": "binary-search-trees"
      }
    ],
    "pattern_tags": [
      {
        "id": "188",
        "name": "Two Pointer",
        "slug": "two-pointer"
      }
    ],
    "topic": "Binary Search Trees",
    "pattern": "Inorder Traversal"
  },
  {
    "id": 97,
    "label": "Correct BST with two nodes swapped",
    "slug": "correct-bst-with-two-nodes-swapped",
    "duration": "16 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/ZWGW7FminDM",
    "leetcode_link": "https://leetcode.com/problems/recover-binary-search-tree/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/recover-binary-search-tree",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2247#correct-bst-with-two-nodes-swapped",
    "topic_tags": [
      {
        "id": "245",
        "name": "Binary Search Trees",
        "slug": "binary-search-trees"
      }
    ],
    "pattern_tags": [
      {
        "id": "205",
        "name": "Tree DFS / Recursive Decomposition",
        "slug": "tree-dfs-recursive-decomposition"
      }
    ],
    "topic": "Binary Search Trees",
    "pattern": "Inorder Traversal"
  },
  {
    "id": 98,
    "label": "Largest BST in Binary Tree",
    "slug": "largest-bst-in-binary-tree",
    "duration": "17 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/X0oXMdtUDwo",
    "leetcode_link": "https://leetcode.com/problems/largest-bst-subtree/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/largest-bst-in-binary-tree",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2247#largest-bst-in-binary-tree",
    "topic_tags": [
      {
        "id": "245",
        "name": "Binary Search Trees",
        "slug": "binary-search-trees"
      }
    ],
    "pattern_tags": [
      {
        "id": "205",
        "name": "Tree DFS / Recursive Decomposition",
        "slug": "tree-dfs-recursive-decomposition"
      }
    ],
    "topic": "Binary Search Trees",
    "pattern": "Inorder Traversal"
  },
  {
    "id": 531,
    "label": "Flood fill algorithm",
    "slug": "flood-fill-algorithm",
    "duration": "20 min",
    "difficulty": "core",
    "yt_video": null,
    "leetcode_link": "https://leetcode.com/problems/flood-fill/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/flood-fill-algorithm",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#flood-fill-algorithm",
    "topic_tags": [
      {
        "id": "246",
        "name": "Graphs",
        "slug": "graphs"
      }
    ],
    "pattern_tags": [
      {
        "id": "212",
        "name": "Graph DFS / Connected Components",
        "slug": "graph-dfs-connected-components"
      }
    ],
    "topic": "Graphs",
    "pattern": "BFS / DFS"
  },
  {
    "id": 534,
    "label": "Number of islands",
    "slug": "number-of-islands",
    "duration": "24 min",
    "difficulty": "core",
    "yt_video": "https://www.youtube.com/watch?v=muncqlKJrH0&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn&index=8",
    "leetcode_link": "https://leetcode.com/problems/number-of-islands/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#number-of-islands",
    "topic_tags": [
      {
        "id": "246",
        "name": "Graphs",
        "slug": "graphs"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "212",
        "name": "Graph DFS / Connected Components",
        "slug": "graph-dfs-connected-components"
      }
    ],
    "topic": "Graphs",
    "pattern": "BFS / DFS"
  },
  {
    "id": 536,
    "label": "Rotten Oranges",
    "slug": "rotten-oranges",
    "duration": "22 min",
    "difficulty": "core",
    "yt_video": "https://www.youtube.com/watch?v=yf3oUhkvqA0",
    "leetcode_link": "https://leetcode.com/problems/rotting-oranges/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/rotting-oranges",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#rotten-oranges",
    "topic_tags": [
      {
        "id": "246",
        "name": "Graphs",
        "slug": "graphs"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "206",
        "name": "BFS / Level Order",
        "slug": "bfs-level-order"
      }
    ],
    "topic": "Graphs",
    "pattern": "BFS / DFS"
  },
  {
    "id": 530,
    "label": "Distance of nearest cell having one",
    "slug": "distance-of-nearest-cell-having-one",
    "duration": "20 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/edXdVwkYHF8",
    "leetcode_link": "https://leetcode.com/problems/01-matrix/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/distance-of-the-nearest-cell-having-1-in-a-binary-matrix",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#distance-of-nearest-cell-having-one",
    "topic_tags": [
      {
        "id": "246",
        "name": "Graphs",
        "slug": "graphs"
      }
    ],
    "pattern_tags": [
      {
        "id": "206",
        "name": "BFS / Level Order",
        "slug": "bfs-level-order"
      }
    ],
    "topic": "Graphs",
    "pattern": "BFS / DFS"
  },
  {
    "id": 537,
    "label": "Surrounded Regions",
    "slug": "surrounded-regions",
    "duration": "23 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/BtdgAys4yMk",
    "leetcode_link": "https://leetcode.com/problems/surrounded-regions/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/surrounded-regions",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#surrounded-regions",
    "topic_tags": [
      {
        "id": "246",
        "name": "Graphs",
        "slug": "graphs"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "212",
        "name": "Graph DFS / Connected Components",
        "slug": "graph-dfs-connected-components"
      }
    ],
    "topic": "Graphs",
    "pattern": "BFS / DFS"
  },
  {
    "id": 532,
    "label": "Number of distinct islands",
    "slug": "number-of-distinct-islands",
    "duration": "18 min",
    "difficulty": "core",
    "yt_video": null,
    "leetcode_link": "https://leetcode.com/problems/number-of-distinct-islands/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/number-of-distinct-islands",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#number-of-distinct-islands",
    "topic_tags": [
      {
        "id": "246",
        "name": "Graphs",
        "slug": "graphs"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      },
      {
        "id": "233",
        "name": "Hashing",
        "slug": "hashing"
      }
    ],
    "pattern_tags": [
      {
        "id": "212",
        "name": "Graph DFS / Connected Components",
        "slug": "graph-dfs-connected-components"
      }
    ],
    "topic": "Graphs",
    "pattern": "BFS / DFS"
  },
  {
    "id": 501,
    "label": "Detect a cycle in an undirected graph",
    "slug": "detect-a-cycle-in-an-undirected-graph",
    "duration": "38 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/zQ3zgFypzX4",
    "leetcode_link": "https://leetcode.com/problems/course-schedule/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/detect-a-cycle-in-an-undirected-graph",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#detect-a-cycle-in-an-undirected-graph",
    "topic_tags": [
      {
        "id": "246",
        "name": "Graphs",
        "slug": "graphs"
      }
    ],
    "pattern_tags": [
      {
        "id": "212",
        "name": "Graph DFS / Connected Components",
        "slug": "graph-dfs-connected-components"
      }
    ],
    "topic": "Graphs",
    "pattern": "BFS / DFS"
  },
  {
    "id": 499,
    "label": "Bipartite graph",
    "slug": "bipartite-graph",
    "duration": "32 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/KG5YFfR0j8A",
    "leetcode_link": "https://leetcode.com/problems/is-graph-bipartite/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#bipartite-graph",
    "topic_tags": [
      {
        "id": "246",
        "name": "Graphs",
        "slug": "graphs"
      }
    ],
    "pattern_tags": [
      {
        "id": "212",
        "name": "Graph DFS / Connected Components",
        "slug": "graph-dfs-connected-components"
      }
    ],
    "topic": "Graphs",
    "pattern": "BFS / DFS"
  },
  {
    "id": 500,
    "label": "Detect a cycle in a directed graph",
    "slug": "detect-a-cycle-in-a-directed-graph",
    "duration": "23 min",
    "difficulty": "core",
    "yt_video": "https://www.youtube.com/watch?v=uzVUw90ZFIg&list=PLgUwDviBIf0rGEWe64KWas0Nryn7SCRWw&index=12",
    "leetcode_link": "https://leetcode.com/problems/course-schedule/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/detect-a-cycle-in-a-directed-graph",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#detect-a-cycle-in-a-directed-graph",
    "topic_tags": [
      {
        "id": "246",
        "name": "Graphs",
        "slug": "graphs"
      }
    ],
    "pattern_tags": [
      {
        "id": "213",
        "name": "Topological Ordering",
        "slug": "topological-ordering"
      }
    ],
    "topic": "Graphs",
    "pattern": "Ordering & Connectivity"
  },
  {
    "id": 502,
    "label": "Topological sort or Kahn's algorithm",
    "slug": "topological-sort-or-kahns-algorithm",
    "duration": "26 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/5lZ0iJMrUMk",
    "leetcode_link": null,
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#topological-sort-or-kahns-algorithm",
    "topic_tags": [
      {
        "id": "246",
        "name": "Graphs",
        "slug": "graphs"
      }
    ],
    "pattern_tags": [
      {
        "id": "213",
        "name": "Topological Ordering",
        "slug": "topological-ordering"
      }
    ],
    "topic": "Graphs",
    "pattern": "Ordering & Connectivity"
  },
  {
    "id": 505,
    "label": "Course Schedule II",
    "slug": "course-schedule-ii",
    "duration": "11 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/WAOfKpxYHR8",
    "leetcode_link": "https://leetcode.com/problems/course-schedule-ii/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/course-schedule-ii",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#course-schedule-ii",
    "topic_tags": [
      {
        "id": "246",
        "name": "Graphs",
        "slug": "graphs"
      }
    ],
    "pattern_tags": [
      {
        "id": "213",
        "name": "Topological Ordering",
        "slug": "topological-ordering"
      }
    ],
    "topic": "Graphs",
    "pattern": "Ordering & Connectivity"
  },
  {
    "id": 503,
    "label": "Alien Dictionary",
    "slug": "alient-dictionary",
    "duration": "20 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/U3N_je7tWAs",
    "leetcode_link": "https://leetcode.com/problems/alien-dictionary/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/alien-dictionary",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#alient-dictionary",
    "topic_tags": [
      {
        "id": "246",
        "name": "Graphs",
        "slug": "graphs"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      },
      {
        "id": "237",
        "name": "Strings",
        "slug": "strings"
      }
    ],
    "pattern_tags": [
      {
        "id": "213",
        "name": "Topological Ordering",
        "slug": "topological-ordering"
      }
    ],
    "topic": "Graphs",
    "pattern": "Ordering & Connectivity"
  },
  {
    "id": 498,
    "label": "Kosaraju's algorithm",
    "slug": "kosaraju's-algorithm",
    "duration": "22 min",
    "difficulty": "pro",
    "yt_video": "https://www.youtube.com/watch?v=V8qIqJxCioo&list=PLgUwDviBIf0rGEWe64KWas0Nryn7SCRWw&index=27",
    "leetcode_link": "https://leetcode.com/problems/maximum-number-of-non-overlapping-substrings/discuss/766485/kosaraju-algorithm-on",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/kosarajus-algorithm",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#kosaraju's-algorithm",
    "topic_tags": [
      {
        "id": "246",
        "name": "Graphs",
        "slug": "graphs"
      }
    ],
    "pattern_tags": [
      {
        "id": "212",
        "name": "Graph DFS / Connected Components",
        "slug": "graph-dfs-connected-components"
      }
    ],
    "topic": "Graphs",
    "pattern": "Ordering & Connectivity"
  },
  {
    "id": 497,
    "label": "Bridges in graph",
    "slug": "bridges-in-graph",
    "duration": "23 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/qrAub5z8FeA",
    "leetcode_link": "https://leetcode.com/problems/critical-connections-in-a-network/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/bridges-in-graph-tarjan-algorithm",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#bridges-in-graph",
    "topic_tags": [
      {
        "id": "246",
        "name": "Graphs",
        "slug": "graphs"
      }
    ],
    "pattern_tags": [
      {
        "id": "212",
        "name": "Graph DFS / Connected Components",
        "slug": "graph-dfs-connected-components"
      }
    ],
    "topic": "Graphs",
    "pattern": "Ordering & Connectivity"
  },
  {
    "id": 496,
    "label": "Articulation point in graph",
    "slug": "articulation-point-in-graph",
    "duration": "21 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/j1QDfU21iZk",
    "leetcode_link": null,
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/articulation-points-in-graph",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#articulation-point-in-graph",
    "topic_tags": [
      {
        "id": "246",
        "name": "Graphs",
        "slug": "graphs"
      }
    ],
    "pattern_tags": [
      {
        "id": "212",
        "name": "Graph DFS / Connected Components",
        "slug": "graph-dfs-connected-components"
      }
    ],
    "topic": "Graphs",
    "pattern": "Ordering & Connectivity"
  },
  {
    "id": 508,
    "label": "Shortest path in undirected graph with unit weights",
    "slug": "shortest-path-in-undirected-graph-with-unit-weights",
    "duration": "16 min",
    "difficulty": "core",
    "yt_video": "https://www.youtube.com/watch?v=C4gxoTaI71U&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn&index=28",
    "leetcode_link": null,
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/shortest-path-in-an-unweighted-undirected-graph-using-bfs",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#shortest-path-in-undirected-graph-with-unit-weights",
    "topic_tags": [
      {
        "id": "246",
        "name": "Graphs",
        "slug": "graphs"
      }
    ],
    "pattern_tags": [
      {
        "id": "214",
        "name": "Shortest Path",
        "slug": "shortest-path"
      }
    ],
    "topic": "Graphs",
    "pattern": "Shortest Path"
  },
  {
    "id": 507,
    "label": "Shortest path in DAG",
    "slug": "shortest-path-in-dag",
    "duration": "26 min",
    "difficulty": "core",
    "yt_video": "https://www.youtube.com/watch?v=ZUFQfFaU-8U&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn&index=27",
    "leetcode_link": null,
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/shortest-path-in-a-directed-acyclic-graph-dag",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#shortest-path-in-dag",
    "topic_tags": [
      {
        "id": "246",
        "name": "Graphs",
        "slug": "graphs"
      }
    ],
    "pattern_tags": [
      {
        "id": "214",
        "name": "Shortest Path",
        "slug": "shortest-path"
      }
    ],
    "topic": "Graphs",
    "pattern": "Shortest Path"
  },
  {
    "id": 520,
    "label": "Dijkstra's algorithm",
    "slug": "dijkstra's-algorithm",
    "duration": "47 min",
    "difficulty": "core",
    "yt_video": "https://www.youtube.com/watch?v=rp1SMw7HSO8&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn&index=35",
    "leetcode_link": null,
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/dijkstras-algorithm",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#dijkstra's-algorithm",
    "topic_tags": [
      {
        "id": "246",
        "name": "Graphs",
        "slug": "graphs"
      },
      {
        "id": "242",
        "name": "Heaps",
        "slug": "heaps"
      }
    ],
    "pattern_tags": [
      {
        "id": "214",
        "name": "Shortest Path",
        "slug": "shortest-path"
      },
      {
        "id": "219",
        "name": "Priority Queue",
        "slug": "priority-queue"
      }
    ],
    "topic": "Graphs",
    "pattern": "Shortest Path"
  },
  {
    "id": 525,
    "label": "Path with minimum effort",
    "slug": "path-with-minimum-effort",
    "duration": "24 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/0ytpZyiZFhA",
    "leetcode_link": "https://leetcode.com/problems/path-with-minimum-effort/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/path-with-minimum-effort",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#path-with-minimum-effort",
    "topic_tags": [
      {
        "id": "246",
        "name": "Graphs",
        "slug": "graphs"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      },
      {
        "id": "242",
        "name": "Heaps",
        "slug": "heaps"
      }
    ],
    "pattern_tags": [
      {
        "id": "214",
        "name": "Shortest Path",
        "slug": "shortest-path"
      }
    ],
    "topic": "Graphs",
    "pattern": "Shortest Path"
  },
  {
    "id": 519,
    "label": "Cheapest flight within K stops",
    "slug": "cheapest-flight-within-k-stops",
    "duration": "23 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/9XybHVqTHcQ",
    "leetcode_link": "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/cheapest-flights-within-k-stops",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#cheapest-flight-within-k-stops",
    "topic_tags": [
      {
        "id": "246",
        "name": "Graphs",
        "slug": "graphs"
      },
      {
        "id": "247",
        "name": "Dynamic Programming",
        "slug": "dynamic-programming"
      },
      {
        "id": "242",
        "name": "Heaps",
        "slug": "heaps"
      }
    ],
    "pattern_tags": [
      {
        "id": "214",
        "name": "Shortest Path",
        "slug": "shortest-path"
      }
    ],
    "topic": "Graphs",
    "pattern": "Shortest Path"
  },
  {
    "id": 518,
    "label": "Bellman ford algorithm",
    "slug": "bellman-ford-algorithm",
    "duration": "27 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/0vVofAhAYjc",
    "leetcode_link": null,
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/bellman-ford-algorithm",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#bellman-ford-algorithm",
    "topic_tags": [
      {
        "id": "246",
        "name": "Graphs",
        "slug": "graphs"
      }
    ],
    "pattern_tags": [
      {
        "id": "214",
        "name": "Shortest Path",
        "slug": "shortest-path"
      }
    ],
    "topic": "Graphs",
    "pattern": "Shortest Path"
  },
  {
    "id": 522,
    "label": "Floyd warshall algorithm",
    "slug": "floyd-warshall-algorithm",
    "duration": "30 min",
    "difficulty": "pro",
    "yt_video": "https://www.youtube.com/watch?v=YbY8cVwWAvw&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn&index=42",
    "leetcode_link": null,
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#floyd-warshall-algorithm",
    "topic_tags": [
      {
        "id": "246",
        "name": "Graphs",
        "slug": "graphs"
      }
    ],
    "pattern_tags": [
      {
        "id": "214",
        "name": "Shortest Path",
        "slug": "shortest-path"
      }
    ],
    "topic": "Graphs",
    "pattern": "Shortest Path"
  },
  {
    "id": 509,
    "label": "Word ladder I",
    "slug": "word-ladder-i",
    "duration": "28 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/tRPda0rcf8E",
    "leetcode_link": "https://leetcode.com/problems/word-ladder/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/word-ladder",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#word-ladder-i",
    "topic_tags": [
      {
        "id": "246",
        "name": "Graphs",
        "slug": "graphs"
      },
      {
        "id": "237",
        "name": "Strings",
        "slug": "strings"
      },
      {
        "id": "233",
        "name": "Hashing",
        "slug": "hashing"
      }
    ],
    "pattern_tags": [
      {
        "id": "206",
        "name": "BFS / Level Order",
        "slug": "bfs-level-order"
      }
    ],
    "topic": "Graphs",
    "pattern": "Shortest Path"
  },
  {
    "id": 510,
    "label": "Word ladder II",
    "slug": "word-ladder-ii",
    "duration": "48 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/AD4SFl7tu7I?si=EpcJQTWm2YeURvEG",
    "leetcode_link": "https://leetcode.com/problems/word-ladder-ii/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/word-ladder-ii",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#word-ladder-ii",
    "topic_tags": [
      {
        "id": "246",
        "name": "Graphs",
        "slug": "graphs"
      },
      {
        "id": "239",
        "name": "Recursion & Backtracking",
        "slug": "recursion-backtracking"
      },
      {
        "id": "237",
        "name": "Strings",
        "slug": "strings"
      },
      {
        "id": "233",
        "name": "Hashing",
        "slug": "hashing"
      }
    ],
    "pattern_tags": [
      {
        "id": "206",
        "name": "BFS / Level Order",
        "slug": "bfs-level-order"
      }
    ],
    "topic": "Graphs",
    "pattern": "Shortest Path"
  },
  {
    "id": 516,
    "label": "Disjoint Set ",
    "slug": "disjoint-set-",
    "duration": "41 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/aBxjDBC4M1U",
    "leetcode_link": null,
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/disjoint-set-union",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#disjoint-set-",
    "topic_tags": [
      {
        "id": "246",
        "name": "Graphs",
        "slug": "graphs"
      }
    ],
    "pattern_tags": [
      {
        "id": "215",
        "name": "Disjoint Set Union",
        "slug": "disjoint-set-union"
      },
      {
        "id": "210",
        "name": "Greedy Choice",
        "slug": "greedy-choice"
      }
    ],
    "topic": "Graphs",
    "pattern": "DSU / MST"
  },
  {
    "id": 517,
    "label": "Find the MST weight",
    "slug": "find-the-mst-weight",
    "duration": "31 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/mJcZjjKzeqk",
    "leetcode_link": "https://leetcode.com/problems/connecting-cities-with-minimum-cost/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/find-the-mst-weight",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#find-the-mst-weight",
    "topic_tags": [
      {
        "id": "246",
        "name": "Graphs",
        "slug": "graphs"
      }
    ],
    "pattern_tags": [
      {
        "id": "215",
        "name": "Disjoint Set Union",
        "slug": "disjoint-set-union"
      },
      {
        "id": "210",
        "name": "Greedy Choice",
        "slug": "greedy-choice"
      }
    ],
    "topic": "Graphs",
    "pattern": "DSU / MST"
  },
  {
    "id": 515,
    "label": "Number of operations to make network connected",
    "slug": "number-of-operations-to-make-network-connected",
    "duration": "14 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/FYrl7iz9_ZU",
    "leetcode_link": "https://leetcode.com/problems/number-of-operations-to-make-network-connected/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#number-of-operations-to-make-network-connected",
    "topic_tags": [
      {
        "id": "246",
        "name": "Graphs",
        "slug": "graphs"
      }
    ],
    "pattern_tags": [
      {
        "id": "215",
        "name": "Disjoint Set Union",
        "slug": "disjoint-set-union"
      }
    ],
    "topic": "Graphs",
    "pattern": "DSU / MST"
  },
  {
    "id": 514,
    "label": "Number of islands II",
    "slug": "number-of-islands-ii",
    "duration": "25 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/Rn6B-Q4SNyA",
    "leetcode_link": "https://leetcode.com/problems/number-of-islands-ii/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#number-of-islands-ii",
    "topic_tags": [
      {
        "id": "246",
        "name": "Graphs",
        "slug": "graphs"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      },
      {
        "id": "233",
        "name": "Hashing",
        "slug": "hashing"
      }
    ],
    "pattern_tags": [
      {
        "id": "215",
        "name": "Disjoint Set Union",
        "slug": "disjoint-set-union"
      }
    ],
    "topic": "Graphs",
    "pattern": "DSU / MST"
  },
  {
    "id": 512,
    "label": "Making a large island",
    "slug": "making-a-large-island",
    "duration": "26 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/lgiz0Oup6gM",
    "leetcode_link": "https://leetcode.com/problems/making-a-large-island/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/making-a-large-island",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2249#making-a-large-island",
    "topic_tags": [
      {
        "id": "246",
        "name": "Graphs",
        "slug": "graphs"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "215",
        "name": "Disjoint Set Union",
        "slug": "disjoint-set-union"
      }
    ],
    "topic": "Graphs",
    "pattern": "DSU / MST"
  },
  {
    "id": 289,
    "label": "Frog jump with K distances",
    "slug": "frog-jump-with-k-distances",
    "duration": "16 min",
    "difficulty": "core",
    "yt_video": "https://www.youtube.com/watch?v=Kmh3rhyEtB8",
    "leetcode_link": null,
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/frog-jump-with-k-distances",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#frog-jump-with-k-distances",
    "topic_tags": [
      {
        "id": "247",
        "name": "Dynamic Programming",
        "slug": "dynamic-programming"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "220",
        "name": "Linear DP",
        "slug": "linear-dp"
      }
    ],
    "topic": "Dynamic Programming",
    "pattern": "State Transition DP"
  },
  {
    "id": 290,
    "label": "House robber",
    "slug": "house-robber",
    "duration": "9 min",
    "difficulty": "core",
    "yt_video": "https://www.youtube.com/watch?v=3WaxQMELSkw",
    "leetcode_link": "https://leetcode.com/problems/house-robber/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/house-robber-ii",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#house-robber",
    "topic_tags": [
      {
        "id": "247",
        "name": "Dynamic Programming",
        "slug": "dynamic-programming"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "220",
        "name": "Linear DP",
        "slug": "linear-dp"
      }
    ],
    "topic": "Dynamic Programming",
    "pattern": "State Transition DP"
  },
  {
    "id": 292,
    "label": "Ninja's training",
    "slug": "ninja's-training",
    "duration": "51 min",
    "difficulty": "core",
    "yt_video": "https://www.youtube.com/watch?v=AE39gJYuRog",
    "leetcode_link": null,
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/ninjas-training",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#ninja's-training",
    "topic_tags": [
      {
        "id": "247",
        "name": "Dynamic Programming",
        "slug": "dynamic-programming"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "221",
        "name": "Multi-State DP",
        "slug": "multi-state-dp"
      }
    ],
    "topic": "Dynamic Programming",
    "pattern": "State Transition DP"
  },
  {
    "id": 300,
    "label": "Unique paths II",
    "slug": "unique-paths-ii",
    "duration": "12 min",
    "difficulty": "pro",
    "yt_video": "https://www.youtube.com/watch?v=TmhpgXScLyY",
    "leetcode_link": "https://leetcode.com/problems/unique-paths-ii/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/unique-paths-ii-obstacles",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#unique-paths-ii",
    "topic_tags": [
      {
        "id": "247",
        "name": "Dynamic Programming",
        "slug": "dynamic-programming"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "222",
        "name": "Grid DP",
        "slug": "grid-dp"
      }
    ],
    "topic": "Dynamic Programming",
    "pattern": "State Transition DP"
  },
  {
    "id": 305,
    "label": "Best time to buy and sell stock with transaction fees",
    "slug": "best-time-to-buy-and-sell-stock-with-cooldown-and-transaction-fees",
    "duration": "6 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/k4eK-vEmnKg",
    "leetcode_link": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/best-time-to-buy-and-sell-stock-with-transaction-fee",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#best-time-to-buy-and-sell-stock-with-cooldown-and-transaction-fees",
    "topic_tags": [
      {
        "id": "247",
        "name": "Dynamic Programming",
        "slug": "dynamic-programming"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "223",
        "name": "Stock Trading DP",
        "slug": "stock-trading-dp"
      }
    ],
    "topic": "Dynamic Programming",
    "pattern": "State Transition DP"
  },
  {
    "id": 304,
    "label": "Best time to buy and sell stock IV",
    "slug": "best-time-to-buy-and-sell-stock-iv",
    "duration": "12 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/IV1dHbk5CDc",
    "leetcode_link": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/best-time-to-buy-and-sell-stock-iv",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#best-time-to-buy-and-sell-stock-iv",
    "topic_tags": [
      {
        "id": "247",
        "name": "Dynamic Programming",
        "slug": "dynamic-programming"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "223",
        "name": "Stock Trading DP",
        "slug": "stock-trading-dp"
      }
    ],
    "topic": "Dynamic Programming",
    "pattern": "State Transition DP"
  },
  {
    "id": 315,
    "label": "0 and 1 Knapsack",
    "slug": "0-and-1-knapsack",
    "duration": "40 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/GqOmJHQZivw",
    "leetcode_link": null,
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#0-and-1-knapsack",
    "topic_tags": [
      {
        "id": "247",
        "name": "Dynamic Programming",
        "slug": "dynamic-programming"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "224",
        "name": "Knapsack / Subset DP",
        "slug": "knapsack-subset-dp"
      }
    ],
    "topic": "Dynamic Programming",
    "pattern": "Knapsack DP"
  },
  {
    "id": 320,
    "label": "Partition a set into two subsets with minimum absolute sum difference",
    "slug": "partition-a-set-into-two-subsets-with-minimum-absolute-sum-difference",
    "duration": "29 min",
    "difficulty": "pro",
    "yt_video": "https://www.youtube.com/watch?v=GS_OqZb2CWc",
    "leetcode_link": "https://leetcode.com/problems/last-stone-weight-ii/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#partition-a-set-into-two-subsets-with-minimum-absolute-sum-difference",
    "topic_tags": [
      {
        "id": "247",
        "name": "Dynamic Programming",
        "slug": "dynamic-programming"
      }
    ],
    "pattern_tags": [
      {
        "id": "224",
        "name": "Knapsack / Subset DP",
        "slug": "knapsack-subset-dp"
      }
    ],
    "topic": "Dynamic Programming",
    "pattern": "Knapsack DP"
  },
  {
    "id": 324,
    "label": "Target sum",
    "slug": "target-sum",
    "duration": "8 min",
    "difficulty": "core",
    "yt_video": "https://www.youtube.com/watch?v=b3GD8263-PQ",
    "leetcode_link": "https://leetcode.com/problems/target-sum/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#target-sum",
    "topic_tags": [
      {
        "id": "247",
        "name": "Dynamic Programming",
        "slug": "dynamic-programming"
      },
      {
        "id": "239",
        "name": "Recursion & Backtracking",
        "slug": "recursion-backtracking"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "224",
        "name": "Knapsack / Subset DP",
        "slug": "knapsack-subset-dp"
      }
    ],
    "topic": "Dynamic Programming",
    "pattern": "Knapsack DP"
  },
  {
    "id": 316,
    "label": "Coin change II",
    "slug": "coin-change-ii",
    "duration": "22 min",
    "difficulty": "pro",
    "yt_video": "https://www.youtube.com/watch?v=HgyouUi11zk",
    "leetcode_link": "https://leetcode.com/problems/coin-change-ii/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/coin-change-ii-combinations",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#coin-change-ii",
    "topic_tags": [
      {
        "id": "247",
        "name": "Dynamic Programming",
        "slug": "dynamic-programming"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "224",
        "name": "Knapsack / Subset DP",
        "slug": "knapsack-subset-dp"
      }
    ],
    "topic": "Dynamic Programming",
    "pattern": "Knapsack DP"
  },
  {
    "id": 308,
    "label": "Longest common subsequence",
    "slug": "longest-common-subsequence",
    "duration": "46 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/-zI4mrF2Pb4",
    "leetcode_link": "https://leetcode.com/problems/longest-common-subsequence/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#longest-common-subsequence",
    "topic_tags": [
      {
        "id": "247",
        "name": "Dynamic Programming",
        "slug": "dynamic-programming"
      },
      {
        "id": "237",
        "name": "Strings",
        "slug": "strings"
      }
    ],
    "pattern_tags": [
      {
        "id": "226",
        "name": "String DP",
        "slug": "string-dp"
      }
    ],
    "topic": "Dynamic Programming",
    "pattern": "Sequence DP"
  },
  {
    "id": 309,
    "label": "Longest common substring",
    "slug": "longest-common-substring",
    "duration": "14 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/_wP9mWNPL5w",
    "leetcode_link": null,
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#longest-common-substring",
    "topic_tags": [
      {
        "id": "247",
        "name": "Dynamic Programming",
        "slug": "dynamic-programming"
      },
      {
        "id": "237",
        "name": "Strings",
        "slug": "strings"
      }
    ],
    "pattern_tags": [
      {
        "id": "226",
        "name": "String DP",
        "slug": "string-dp"
      }
    ],
    "topic": "Dynamic Programming",
    "pattern": "Sequence DP"
  },
  {
    "id": 310,
    "label": "Longest palindromic subsequence",
    "slug": "longest-palindromic-subsequence",
    "duration": "9 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/6i_T5kkfv4A",
    "leetcode_link": "https://leetcode.com/problems/longest-palindromic-subsequence/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#longest-palindromic-subsequence",
    "topic_tags": [
      {
        "id": "247",
        "name": "Dynamic Programming",
        "slug": "dynamic-programming"
      },
      {
        "id": "237",
        "name": "Strings",
        "slug": "strings"
      }
    ],
    "pattern_tags": [
      {
        "id": "226",
        "name": "String DP",
        "slug": "string-dp"
      }
    ],
    "topic": "Dynamic Programming",
    "pattern": "Sequence DP"
  },
  {
    "id": 636,
    "label": "Longest Increasing Subsequence",
    "slug": "longest-increasing-subsequence",
    "duration": "40 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/on2hvxBXJH4",
    "leetcode_link": "https://leetcode.com/problems/longest-increasing-subsequence/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#longest-increasing-subsequence",
    "topic_tags": [
      {
        "id": "247",
        "name": "Dynamic Programming",
        "slug": "dynamic-programming"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      },
      {
        "id": "236",
        "name": "Binary Search",
        "slug": "binary-search"
      }
    ],
    "pattern_tags": [
      {
        "id": "225",
        "name": "LIS / Sequence DP",
        "slug": "lis-sequence-dp"
      },
      {
        "id": "191",
        "name": "Lower Bound / Upper Bound",
        "slug": "lower-bound-upper-bound"
      }
    ],
    "topic": "Dynamic Programming",
    "pattern": "Sequence DP"
  },
  {
    "id": 780,
    "label": "Number of Longest Increasing Subsequences",
    "slug": "number-of-longest-increasing-subsequences",
    "duration": "20 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/cKVl1TFdNXg",
    "leetcode_link": "https://leetcode.com/problems/number-of-longest-increasing-subsequence/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#number-of-longest-increasing-subsequences",
    "topic_tags": [
      {
        "id": "247",
        "name": "Dynamic Programming",
        "slug": "dynamic-programming"
      },
      {
        "id": "251",
        "name": "Advanced Range Data Structures",
        "slug": "advanced-range-data-structures"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "225",
        "name": "LIS / Sequence DP",
        "slug": "lis-sequence-dp"
      }
    ],
    "topic": "Dynamic Programming",
    "pattern": "Sequence DP"
  },
  {
    "id": 307,
    "label": "Edit distance",
    "slug": "edit-distance",
    "duration": "37 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/fJaKO8FbDdo",
    "leetcode_link": "https://leetcode.com/problems/edit-distance/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#edit-distance",
    "topic_tags": [
      {
        "id": "247",
        "name": "Dynamic Programming",
        "slug": "dynamic-programming"
      },
      {
        "id": "237",
        "name": "Strings",
        "slug": "strings"
      }
    ],
    "pattern_tags": [
      {
        "id": "226",
        "name": "String DP",
        "slug": "string-dp"
      }
    ],
    "topic": "Dynamic Programming",
    "pattern": "Sequence DP"
  },
  {
    "id": 314,
    "label": "Wildcard matching",
    "slug": "wildcard-matching",
    "duration": "43 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/ZmlQ3vgAOMo",
    "leetcode_link": "https://leetcode.com/problems/wildcard-matching/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#wildcard-matching",
    "topic_tags": [
      {
        "id": "247",
        "name": "Dynamic Programming",
        "slug": "dynamic-programming"
      },
      {
        "id": "237",
        "name": "Strings",
        "slug": "strings"
      },
      {
        "id": "239",
        "name": "Recursion & Backtracking",
        "slug": "recursion-backtracking"
      }
    ],
    "pattern_tags": [
      {
        "id": "226",
        "name": "String DP",
        "slug": "string-dp"
      }
    ],
    "topic": "Dynamic Programming",
    "pattern": "Sequence DP"
  },
  {
    "id": 327,
    "label": "Matrix chain multiplication",
    "slug": "matrix-chain-multiplication",
    "duration": "61 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/vRVfmbCFW7Y",
    "leetcode_link": null,
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#matrix-chain-multiplication",
    "topic_tags": [
      {
        "id": "247",
        "name": "Dynamic Programming",
        "slug": "dynamic-programming"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "227",
        "name": "Interval / Partition DP",
        "slug": "interval-partition-dp"
      }
    ],
    "topic": "Dynamic Programming",
    "pattern": "Partition DP"
  },
  {
    "id": 329,
    "label": "Palindrome partitioning II ",
    "slug": "palindrome-partitioning-ii-",
    "duration": "22 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/_H8V5hJUGd0",
    "leetcode_link": "https://leetcode.com/problems/palindrome-partitioning-ii/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/palindrome-partitioning-ii-minimum-cuts",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2254#palindrome-partitioning-ii-",
    "topic_tags": [
      {
        "id": "247",
        "name": "Dynamic Programming",
        "slug": "dynamic-programming"
      },
      {
        "id": "237",
        "name": "Strings",
        "slug": "strings"
      }
    ],
    "pattern_tags": [
      {
        "id": "227",
        "name": "Interval / Partition DP",
        "slug": "interval-partition-dp"
      }
    ],
    "topic": "Dynamic Programming",
    "pattern": "Partition DP"
  },
  {
    "id": 1027,
    "label": "Trie Implementation and Advanced Operations",
    "slug": "trie-implementation-and-advanced-operations",
    "duration": "22 min",
    "difficulty": "core",
    "yt_video": null,
    "leetcode_link": "https://leetcode.com/problems/implement-trie-ii-prefix-tree/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2259#trie-implementation-and-advanced-operations",
    "topic_tags": [
      {
        "id": "248",
        "name": "Tries",
        "slug": "tries"
      }
    ],
    "pattern_tags": [
      {
        "id": "216",
        "name": "Prefix Matching",
        "slug": "prefix-matching"
      }
    ],
    "topic": "Tries",
    "pattern": "Trie"
  },
  {
    "id": 1023,
    "label": "Longest Word with All Prefixes",
    "slug": "longest-word-with-all-prefixes",
    "duration": "25 min",
    "difficulty": "core",
    "yt_video": "https://www.youtube.com/watch?v=AWnBa91lThI&list=PLgUwDviBIf0pcIDCZnxhv0LkHf5KzG9zp&index=3",
    "leetcode_link": "https://leetcode.com/problems/longest-word-with-all-prefixes/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2259#longest-word-with-all-prefixes",
    "topic_tags": [
      {
        "id": "248",
        "name": "Tries",
        "slug": "tries"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      },
      {
        "id": "237",
        "name": "Strings",
        "slug": "strings"
      }
    ],
    "pattern_tags": [
      {
        "id": "216",
        "name": "Prefix Matching",
        "slug": "prefix-matching"
      }
    ],
    "topic": "Tries",
    "pattern": "Trie"
  },
  {
    "id": 1026,
    "label": "Number of distinct substrings in a string",
    "slug": "number-of-distinct-substrings-in-a-string",
    "duration": "17 min",
    "difficulty": "pro",
    "yt_video": "https://www.youtube.com/watch?v=RV0QeTyHZxo&list=PLgUwDviBIf0pcIDCZnxhv0LkHf5KzG9zp&index=4",
    "leetcode_link": "https://leetcode.com/problems/number-of-distinct-substrings-in-a-string/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2259#number-of-distinct-substrings-in-a-string",
    "topic_tags": [
      {
        "id": "248",
        "name": "Tries",
        "slug": "tries"
      },
      {
        "id": "237",
        "name": "Strings",
        "slug": "strings"
      }
    ],
    "pattern_tags": [
      {
        "id": "216",
        "name": "Prefix Matching",
        "slug": "prefix-matching"
      }
    ],
    "topic": "Tries",
    "pattern": "Trie"
  },
  {
    "id": 1024,
    "label": "Maximum XOR of two numbers in an array",
    "slug": "maximum-xor-of-two-numbers-in-an-array",
    "duration": "34 min",
    "difficulty": "core",
    "yt_video": "https://www.youtube.com/watch?v=EIhAwfHubE8&list=PLgUwDviBIf0pcIDCZnxhv0LkHf5KzG9zp&index=6",
    "leetcode_link": "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2259#maximum-xor-of-two-numbers-in-an-array",
    "topic_tags": [
      {
        "id": "248",
        "name": "Tries",
        "slug": "tries"
      },
      {
        "id": "233",
        "name": "Hashing",
        "slug": "hashing"
      },
      {
        "id": "240",
        "name": "Bit Manipulation",
        "slug": "bit-manipulation"
      }
    ],
    "pattern_tags": [
      {
        "id": "198",
        "name": "Bitwise XOR",
        "slug": "bitwise-xor"
      }
    ],
    "topic": "Tries",
    "pattern": "Trie"
  },
  {
    "id": 1025,
    "label": "Maximum Xor with an element from an array",
    "slug": "maximum-xor-with-an-element-from-an-array",
    "duration": "23 min",
    "difficulty": "pro",
    "yt_video": "https://www.youtube.com/watch?v=Q8LhG9Pi5KM&list=PLgUwDviBIf0pcIDCZnxhv0LkHf5KzG9zp&index=7",
    "leetcode_link": "https://leetcode.com/problems/maximum-xor-with-an-element-from-array/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2259#maximum-xor-with-an-element-from-an-array",
    "topic_tags": [
      {
        "id": "248",
        "name": "Tries",
        "slug": "tries"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      },
      {
        "id": "240",
        "name": "Bit Manipulation",
        "slug": "bit-manipulation"
      }
    ],
    "pattern_tags": [
      {
        "id": "198",
        "name": "Bitwise XOR",
        "slug": "bitwise-xor"
      }
    ],
    "topic": "Tries",
    "pattern": "Trie"
  },
  {
    "id": 979,
    "label": "Rabin Karp Algorithm",
    "slug": "rabin-karp-algorithm",
    "duration": "34 min",
    "difficulty": "pro",
    "yt_video": null,
    "leetcode_link": "https://leetcode.com/problems/repeated-string-match/discuss/416144/Rabin-Karp-algorithm-C%2B%2B-implementation",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2261#rabin-karp-algorithm",
    "topic_tags": [
      {
        "id": "237",
        "name": "Strings",
        "slug": "strings"
      }
    ],
    "pattern_tags": [
      {
        "id": "217",
        "name": "String Matching / Rolling Hash",
        "slug": "string-matching-rolling-hash"
      }
    ],
    "topic": "Strings",
    "pattern": "String Matching"
  },
  {
    "id": 981,
    "label": "Z function",
    "slug": "z-function",
    "duration": "35 min",
    "difficulty": "pro",
    "yt_video": null,
    "leetcode_link": null,
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2261#z-function",
    "topic_tags": [
      {
        "id": "237",
        "name": "Strings",
        "slug": "strings"
      }
    ],
    "pattern_tags": [
      {
        "id": "217",
        "name": "String Matching / Rolling Hash",
        "slug": "string-matching-rolling-hash"
      }
    ],
    "topic": "Strings",
    "pattern": "String Matching"
  },
  {
    "id": 977,
    "label": "KMP Algorithm or LPS array",
    "slug": "kmp-algorithm-or-lps-array",
    "duration": "29 min",
    "difficulty": "pro",
    "yt_video": null,
    "leetcode_link": "https://leetcode.com/problems/implement-strstr/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2261#kmp-algorithm-or-lps-array",
    "topic_tags": [
      {
        "id": "237",
        "name": "Strings",
        "slug": "strings"
      }
    ],
    "pattern_tags": [
      {
        "id": "217",
        "name": "String Matching / Rolling Hash",
        "slug": "string-matching-rolling-hash"
      }
    ],
    "topic": "Strings",
    "pattern": "String Matching"
  },
  {
    "id": 980,
    "label": "Shortest Palindrome",
    "slug": "shortest-palindrome",
    "duration": "7 min",
    "difficulty": "pro",
    "yt_video": null,
    "leetcode_link": "https://leetcode.com/problems/shortest-palindrome/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2261#shortest-palindrome",
    "topic_tags": [
      {
        "id": "237",
        "name": "Strings",
        "slug": "strings"
      },
      {
        "id": "233",
        "name": "Hashing",
        "slug": "hashing"
      }
    ],
    "pattern_tags": [
      {
        "id": "217",
        "name": "String Matching / Rolling Hash",
        "slug": "string-matching-rolling-hash"
      }
    ],
    "topic": "Strings",
    "pattern": "String Matching"
  },
  {
    "id": 142,
    "label": "Power Set Bit Manipulation",
    "slug": "power-set-bit-manipulation",
    "duration": "12 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/LqKaUv1G3_I?si=UXU_T5OsHiokPRvP",
    "leetcode_link": "https://leetcode.com/problems/subsets/",
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2263#power-set-bit-manipulation",
    "topic_tags": [
      {
        "id": "240",
        "name": "Bit Manipulation",
        "slug": "bit-manipulation"
      }
    ],
    "pattern_tags": [
      {
        "id": "199",
        "name": "Bitmask Enumeration",
        "slug": "bitmask-enumeration"
      }
    ],
    "topic": "Bit Manipulation",
    "pattern": "Bit Manipulation"
  },
  {
    "id": 144,
    "label": "Single Number - II",
    "slug": "single-number---ii",
    "duration": "30 min",
    "difficulty": "core",
    "yt_video": null,
    "leetcode_link": "https://leetcode.com/problems/single-number-ii/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/single-number-ii",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2263#single-number---ii",
    "topic_tags": [
      {
        "id": "240",
        "name": "Bit Manipulation",
        "slug": "bit-manipulation"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "184",
        "name": "Basic Traversal / Scan",
        "slug": "basic-traversal-scan"
      }
    ],
    "topic": "Bit Manipulation",
    "pattern": "Bit Manipulation"
  },
  {
    "id": 145,
    "label": "Single Number - III",
    "slug": "single-number---iii",
    "duration": "24 min",
    "difficulty": "pro",
    "yt_video": "https://youtu.be/UA5JnV1J2sI?si=VFBRJyb3boZvx_r1",
    "leetcode_link": "https://leetcode.com/problems/single-number-iii/",
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/single-number-iii",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2263#single-number---iii",
    "topic_tags": [
      {
        "id": "240",
        "name": "Bit Manipulation",
        "slug": "bit-manipulation"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "198",
        "name": "Bitwise XOR",
        "slug": "bitwise-xor"
      }
    ],
    "topic": "Bit Manipulation",
    "pattern": "Bit Manipulation"
  },
  {
    "id": 21,
    "label": "Find the repeating and missing number",
    "slug": "find-the-repeating-and-missing-number",
    "duration": "41 min",
    "difficulty": "core",
    "yt_video": "https://youtu.be/2D0D8HE6uak",
    "leetcode_link": null,
    "article_link": "https://takeuforward.org/blogs/data-structure-and-algorithm/find-the-missing-and-repeating-numbers-in-an-array",
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2263#find-the-repeating-and-missing-number",
    "topic_tags": [
      {
        "id": "234",
        "name": "Sorting",
        "slug": "sorting"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "190",
        "name": "Sort and Scan",
        "slug": "sort-and-scan"
      }
    ],
    "topic": "Bit Manipulation",
    "pattern": "Bit Manipulation"
  },
  {
    "id": 653,
    "label": "Print all primes till N",
    "slug": "print-all-primes-till-n",
    "duration": "18 min",
    "difficulty": "core",
    "yt_video": null,
    "leetcode_link": null,
    "article_link": null,
    "tuf_practice_link": "https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns?page=sheet&open=2265#print-all-primes-till-n",
    "topic_tags": [
      {
        "id": "232",
        "name": "Mathematics",
        "slug": "mathematics"
      },
      {
        "id": "235",
        "name": "Arrays",
        "slug": "arrays"
      }
    ],
    "pattern_tags": [
      {
        "id": "218",
        "name": "Number Theory",
        "slug": "number-theory"
      }
    ],
    "topic": "Mathematics",
    "pattern": "Number Theory"
  }
];

// Recommended Group Study Schedule Mapping (Days per topic)
export const STRIVER_180_TOPIC_ESTIMATES: Record<string, number> = {
  "Arrays": 5,
  "Hashing": 2,
  "Binary Search": 5,
  "Sliding Window and Two Pointers": 4,
  "Recursion and Backtracking": 4,
  "Linked List": 5,
  "Stack and Queues": 5,
  "Greedy Algorithms": 3,
  "Heaps": 3,
  "Binary Trees": 6,
  "Binary Search Trees": 4,
  "Graphs": 9,
  "Dynamic Programming": 8,
  "Tries": 2,
  "Strings": 2,
  "Bit Manipulation": 2,
  "Mathematics": 1
};
