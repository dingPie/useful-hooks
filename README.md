## 유용한 hooks 모음

실무에서 직접 짠 코드 중 재사용성이 높은 hooks 및 코드를 모았습니다.

<br />
<br />

## Hooks

### useMultipleKeyEventEffect

여러가지 키보드 이벤트를 보다 쉽게 관리하기 위한 hooks 입니다.

```ts
useMultipleKeyEventEffect({
  diff: 300,
  keyEvent: {
    Enter: [
      ,
      // 객체의 key는 각 키보드의 키로 지정합니다.
      // N번째 클릭마다 이벤트를 할당합니다. 1번 클릭 이벤트는 불필요하여 비워둡니다.
      () => {
        console.log('Enter, 2번 클릭 이벤트');
      },
      () => {
        console.log('Enter, 3번 클릭 이벤트');
      },
    ],
    ' ': [() => console.log('스페이스 한번')],
  },
});
```

<br />

### useAnimationFrame

requestAnimationFrame을 보다 쉽게 사용하기 위한 hooks입니다.
animationFrame은 일반 상태와 다르게 별도에 스레드에서 작동하므로 사용법을 익히고 사용해주세요.

```ts
const { animateFrame, cancelAnimateFrame } = useAnimationFrame({});

useEffect(() => {
  const startBallAnimation = () => {
    animateFrame(() => {
      // canvas 등 이벤트
    });
  };
  cancelAnimateFrame();
  startBallAnimation();
}, []);
```

<br />

### useCheckboxHandler

checkbox 상태르 보다 쉽고 효율적으로 사용하기 위한 hooks입니다.
Map 자료구조 기반으로 낮은 비용과 각 데이터를 자유롭게 저장하여추후 확장성을 제공합니다.

```ts
  const { isChecked, checkItem, resetChecked, getValues } = useCheckboxHandler({
    dataList: dataList,
    keyName: "id",
    valueList: ["id", "name"],
  });

  ...

        <Flex flexWrap="wrap" rowGap="16px" columnGap="32px">
          {industry.childSet.map((checkData) => {
            return (
              <Checkbox
                key={checkData.id}
                isChecked={isChecked(checkData)}
                onChange={() => onChangeCheckIte(checkData)}
              >
                {checkData.name}
              </Checkbox>
            );
          })}
        </Flex>

```

<br />

### usePagination

API 통신시 사용되는 pagination을 보다 쉽게 사용하기 위한 hooks입니다.
처음 / 다음 버튼 등 요구사항에 따라 일부 코드 수정이 필요할 수 있습니다.

```ts
const {
  pageNum,
  setPageNum,
  isDisabledNext,
  isDisabledPrev,
  pageButtonList,
  setFirst,
  setLast,
  setPrev,
  setNext,
} = usePagination({
  page,
  setPage,
  total,
});
```

<br />

### useTimer

Javascript 환경의 setTimeout / setInterval의 EventLoop로 인한 시간차를 보완하여 정확한 시간으로 동작하는 타이머입니다.

```ts
const { ms, stopTimer, setUseTimer } = useTimer();

setUseTimer(1000 * 60 * 3); // MS 단위로 지정하여 시작합니다.
```

<br />
<br />

## Etc

### CustomQueryClientProvider

React Query v5 환경에서 보다 쉽고 정확하게 Error 처리를 위한 CustomProvider 입니다.
각 사용 환경마다 에러 함수와 사용법을 정의하여 사용해주세요.

<br />

### useContextModal

Feedback, 간단한 의사결정 등 모달을 context 환경에서 전역적으로 관리하며, React Native의 Alert 처럼 손쉽게 사용하기 위한 함수입니다.
다양한 커스텀을 제공하며, 필요에 따라 props를 추가하여 사용합니다.

**Modal이 표시된 이후 내부의 상태는 변하지 않으니 주의해주세요.**

```ts

const contextModal = useContextModal();

...

 contextModal.open({
          title: '정보를 저장하지 않고 이동할까요?',
          content:
            '정보를 저장하지 않고, 화면을 이동하면\n변경된 정보가 반영되지 않아요.',
          buttons: [
            {
              text: '취소',
              isCancel: true,
            },
            {
              text: '저장 안함',
              onClick: () => {
                callback();
                contextModal.close();
              },
            },
          ],
        });

```

<br />

### useYieldLogic

클라이언트에서 제어권을 넘겨 비동기로 동작하는 로직을 구현하기 위한 함수입니다.

```ts

const { endYield, startYield } = useYieldLogic();

...

const 이벤트_시작 = async() => {
  if (안내모달표시) {
    const result = await startYield();
  }

  // endYield 가 호출되면 아래 로직 실행됨
}

const 안내모달_확인 = async() => {
  endYield('startYield에 값을 전달할 수 있습니다');
}

```
