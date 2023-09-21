//TODO: Шаг 1: Определяем минимальное пороговое значение поддержки --> (Если нужно будет в процентном соотношении)
// const calculateMinSupportRule = (transactions, support) => {
//   return transactions.length * support;
// }

// Шаг 2: Создаём функции для подсчета поддержки и достоверности
import {STATISTIC_PRODUCT_TYPES} from "../constants";

const calculateSupport = (transactions, itemSet) => {
  return transactions.filter((transaction) =>
    itemSet.every((item) => transaction.includes(item)),
  ).length;
}

const calculateConfidence = (transactions, rule) => {
  const [antecedent, consequent] = rule;
  const antecedentSupport = calculateSupport(transactions, antecedent);
  const ruleSupport = calculateSupport(transactions,[...antecedent, ...consequent]);
  return ruleSupport / antecedentSupport;
}

// Шаг 3: Находим все одноэлементные наборы с проверкой на minSupport
const findFrequent1ItemSets = (transactions, minSupport) => {
  const unicCandidatesIDs = [...new Set(transactions.flat())];

  return unicCandidatesIDs.reduce((acc, item) => {
    const foundCandidate = transactions.filter(_ => _.includes(item));

    if(foundCandidate.length >= minSupport) {
      return [...acc, [item]]
    }

    return acc
  }, []);
}

// Шаг 4: Генерация кандидатов наборов (join)
const generateCandidateItemSets = (prevFrequentItemSets) => {
  const k = prevFrequentItemSets[0].length + 1;

  return prevFrequentItemSets.reduce((acc, set1, i) => {
    const remainingSets = prevFrequentItemSets.slice(i + 1);

    const newCandidates = remainingSets.reduce((innerAcc, set2) => {
      if (set1.slice(0, k - 2).every((item, index) => item === set2[index])) {
        innerAcc.push([...set1, set2[k - 2]]);
      }
      return innerAcc;
    }, []);

    return [...acc, ...newCandidates];
  }, []);
}

// Шаг 5: Подсчет поддержки кандидатов
const calculateSupportForCandidates = (transactions, candidates) => {
  return candidates.reduce((support, candidate) => {
    return transactions.reduce((innerSupport, transaction) => {
      if (candidate.every((item) => transaction.includes(item))) {
        const key = candidate.join(',');
        innerSupport[key] = (innerSupport[key] || 0) + 1;
      }
      return innerSupport;
    }, support);
  }, {});
}

// Шаг 6: Отбор частых наборов
const findFrequentItemSets = (candidateSupport, minSupport) => {
  return Object.keys(candidateSupport).reduce((acc, candidate) => {
    if (candidateSupport[candidate] >= minSupport) {
      return [...acc, candidate.split(',').map((item) => item.trim())];
    }

    return acc
  }, [])
}

// Шаг 7: Генерация правил ассоциаций
// Функция для получения всех подмножеств набора
const getSubsets = (itemSet) => {
  const subsets = [];
  const n = itemSet.length;

  for (let i = 1; i < Math.pow(2, n) - 1; i++) {
    const subset = itemSet.reduce((acc, _, j) => {
      if (i & (1 << j)) {
        acc.push(itemSet[j]);
      }
      return acc;
    }, [])

    subsets.push(subset);
  }

  return subsets;
}

function generateAssociationRules(transactions, frequentItemSets, minConfidence) {
  return frequentItemSets.reduce((rules, itemSet) => {
    if (itemSet.length > 1) {
      const subsets = getSubsets(itemSet);
      const newRules = subsets.reduce((acc, subset) => {
        const antecedent = subset;
        const consequent = itemSet.filter((item) => !subset.includes(item));
        const rule = [antecedent, consequent];
        const confidence = calculateConfidence(transactions, rule).toFixed(2);

        if (confidence >= minConfidence) {
          acc.push({ antecedent, consequent, confidence });
        }

        return acc;
      }, []);

      return [...rules, ...newRules];
    }

    return rules;
  }, []);
}

// Шаг 8: Запускаем процесс Apriori (associations)
export const getAssociations = (transactions, minSupport, minConfidence) => {
  const frequentItemSets = [];
  //TODO: Минимальная поддержка minSupport (например, 2 транзакции с элементом или набором) --> Если нужно будет в процентном соотношении
  // const minSupport = calculateMinSupportRule(transactions, support);
  let frequentItemSetsK = findFrequent1ItemSets(transactions, minSupport);

  while (frequentItemSetsK.length > 0) {
    frequentItemSets.push(frequentItemSetsK);
    const candidates = generateCandidateItemSets(frequentItemSetsK);
    const candidateSupport = calculateSupportForCandidates(transactions, candidates);
    frequentItemSetsK = findFrequentItemSets(candidateSupport, minSupport);
  }

  return generateAssociationRules(transactions, frequentItemSets.reduce((acc, val) => acc.concat(val), []), minConfidence);
}

export const generateProductsAssociationsEnum = (associations, products) => {
  const allAntecedents = associations?.reduce((acc, item) => {
    return [...acc, ...item?.antecedent];
  }, [])
  const uniqAntecedents = [...new Set(allAntecedents)];
  const generatedAntecedentsEnum = uniqAntecedents?.length && uniqAntecedents?.reduce((acc, item) => {
    const foundProduct = products?.find(_ => _.id === item);
    if(foundProduct) {
      acc[item] = foundProduct.name;
    }

    return acc;
  }, {});

  return {
    ...{[STATISTIC_PRODUCT_TYPES.ALL]: "Всі продукти"},
    ...generatedAntecedentsEnum
  }
}